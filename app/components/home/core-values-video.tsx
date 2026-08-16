"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { coreValuesVideo } from "@/app/lib/media";
import "plyr/dist/plyr.css";

/**
 * Plyr ships a `.d.ts` that declares both `export =` and `export default`,
 * which TypeScript resolves to neither cleanly. We only ever call two methods,
 * so a structural type is more honest than casting through Plyr's own.
 */
type PlyrPlayer = {
  destroy: () => void;
  on: (event: string, callback: () => void) => void;
};

type PlyrCtor = new (
  target: HTMLElement,
  options?: Record<string, unknown>,
) => PlyrPlayer;

/** Seconds of muted preview before the viewer is asked to continue. */
const TEASER_SECONDS = 5;

/**
 * Playback phases:
 *  idle   — in view but not started (also the reduced-motion resting state)
 *  teaser — muted preview autoplaying from 0:00, no chrome
 *  gate    — paused at TEASER_SECONDS, "watch the full story" overlay
 *  full   — Plyr mounted, unmuted, restarted from 0:00 with full controls
 *  ended  — finished, replay offered
 */
type Phase = "idle" | "teaser" | "gate" | "full" | "ended";

/**
 * Plyr paints its chrome from these custom properties, which inherit into the
 * player's DOM — so setting them on our wrapper themes it without overriding
 * Plyr's stylesheet or leaking rules into globals.css.
 */
const plyrTheme = {
  "--plyr-color-main": "var(--brand-500)",
  "--plyr-video-control-color": "#ffffff",
  "--plyr-video-control-color-hover": "#ffffff",
  "--plyr-video-controls-background":
    "linear-gradient(transparent, rgb(21 36 31 / 0.85))",
  "--plyr-video-background": "var(--brand-950)",
  "--plyr-range-thumb-background": "#ffffff",
  "--plyr-range-track-height": "4px",
  "--plyr-control-radius": "0px",
  "--plyr-font-family": "var(--font-body), system-ui, sans-serif",
} as React.CSSProperties;

export function CoreValuesVideo({ startTeaser = false }: { startTeaser?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<PlyrPlayer | null>(null);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  // Defer fetching the 24MB file until the section is near the viewport.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  // Begin the muted preview once the section's entry animation has landed.
  // Reduced-motion visitors get the poster and an explicit play button instead.
  useEffect(() => {
    if (!shouldLoad || !startTeaser || reducedMotion) return;
    if (phase !== "idle") return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.currentTime = 0;
    void video.play().then(
      () => setPhase("teaser"),
      // Autoplay refused (battery saver, strict settings) — fall back to the gate.
      () => setPhase("gate"),
    );
  }, [shouldLoad, startTeaser, reducedMotion, phase]);

  // Stop the preview at the gate mark.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || phase !== "teaser") return;

    const onTimeUpdate = () => {
      if (video.currentTime >= TEASER_SECONDS) {
        video.pause();
        setPhase("gate");
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [phase]);

  // Tear down Plyr on unmount so it doesn't leak listeners or leave its wrapper.
  useEffect(() => {
    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  /**
   * Mounts Plyr on first use and restarts with sound. Deferring the mount keeps
   * the preview free of chrome, and running this from a click is what lets the
   * browser allow unmuted playback.
   */
  const startFullPlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!playerRef.current) {
      // Loaded on demand so Plyr stays out of the homepage's initial bundle.
      const mod = (await import("plyr")) as unknown as PlyrCtor & {
        default?: PlyrCtor;
      };
      const Plyr: PlyrCtor = mod.default ?? mod;

      playerRef.current = new Plyr(video, {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "duration",
          "mute",
          "volume",
          "fullscreen",
        ],
        resetOnEnd: false,
        // The clip carries burned-in subtitles along its bottom edge, which the
        // control bar would otherwise sit on top of. Fading out on idle keeps
        // them readable; the bar returns on hover or mouse-move.
        hideControls: true,
      });
      playerRef.current.on("ended", () => setPhase("ended"));
    }

    video.currentTime = 0;
    video.muted = false;
    setPhase("full");
    void video.play();
  }, []);

  const showPoster = phase === "idle";

  return (
    <div
      ref={wrapperRef}
      style={plyrTheme}
      className="relative aspect-video w-full overflow-hidden bg-brand-900/5"
    >
      {shouldLoad ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={coreValuesVideo.poster}
          playsInline
          preload="none"
          muted
        >
          <source src={coreValuesVideo.mp4} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={coreValuesVideo.poster}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      )}

      {(phase === "gate" || showPoster || phase === "ended") && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 bg-brand-950/70 px-6 backdrop-blur-[2px]">
          <p className="max-w-sm text-center font-serif text-2xl uppercase leading-tight tracking-[0.06em] text-white sm:text-3xl">
            {phase === "ended" ? "Watch it again?" : "Watch the full story"}
          </p>
          <button
            type="button"
            onClick={startFullPlayback}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-medium text-brand-900 transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {phase === "ended" ? (
              <RotateCcw className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Play className="h-5 w-5" aria-hidden="true" />
            )}
            {phase === "ended" ? "Replay" : "Continue"}
          </button>
        </div>
      )}
    </div>
  );
}
