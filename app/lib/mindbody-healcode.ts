"use client";

const HEALCODE_SRC =
  "https://widgets.mindbodyonline.com/javascripts/healcode.js";
const HEALCODE_SCRIPT_ID = "mindbody-healcode-loader";

let loading: Promise<void> | undefined;

/** Keep Mindbody's global dependencies alive across client-side navigation. */
export function loadHealcodeOnce(): Promise<void> {
  if (loading) return loading;

  loading = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script#${HEALCODE_SCRIPT_ID}, script[src="${HEALCODE_SRC}"]`,
    );

    if (existing?.dataset.healcodeState === "failed") {
      reject(new Error("Mindbody could not load."));
      return;
    }
    if (
      existing?.dataset.healcodeState === "loaded" ||
      "HealcodeWidget" in window
    ) {
      resolve();
      return;
    }

    const script = existing ?? document.createElement("script");
    const onLoad = () => {
      script.dataset.healcodeState = "loaded";
      cleanup();
      resolve();
    };
    const onError = () => {
      script.dataset.healcodeState = "failed";
      cleanup();
      reject(new Error("Mindbody could not load."));
    };
    const cleanup = () => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };
    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);

    if (!existing) {
      script.id = HEALCODE_SCRIPT_ID;
      script.src = HEALCODE_SRC;
      script.type = "text/javascript";
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return loading;
}
