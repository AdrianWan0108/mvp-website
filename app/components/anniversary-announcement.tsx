"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { anniversary, anniversaryIsActive } from "../lib/anniversary";

const storageKey = `mvp:${anniversary.id}:dismissed`;
const changeEvent = "mvp-anniversary-dismissed";
let dismissedThisVisit = false;

function getDismissed() {
  if (dismissedThisVisit) return true;
  try {
    return window.localStorage.getItem(storageKey) === "true";
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(changeEvent, onChange);
  };
}

const getServerSnapshot = () => false;

export function AnniversaryAnnouncement({ onDismiss }: { onDismiss: () => void }) {
  const dismissed = useSyncExternalStore(subscribe, getDismissed, getServerSnapshot);
  if (!anniversaryIsActive || dismissed) return null;

  function dismiss() {
    dismissedThisVisit = true;
    try {
      window.localStorage.setItem(storageKey, "true");
    } catch {
      // In-memory dismissal still works when browser storage is unavailable.
    }
    window.dispatchEvent(new Event(changeEvent));
    onDismiss();
  }

  return (
    <aside aria-label="Anniversary announcement" className="anniversary-announcement bg-brand-950 text-white">
      <div className="relative mx-auto flex min-h-16 max-w-[110rem] items-center justify-center pl-4 pr-14 sm:min-h-11 sm:px-16">
        <Link href={anniversary.href} className="py-2 text-center text-xs leading-relaxed font-medium underline-offset-4 hover:underline focus-visible:outline-white sm:text-sm">
          <span className="block sm:inline">Anniversary Rehab Week · {anniversary.shortDates}</span>
          <span className="hidden sm:inline"> — </span>
          <span className="block text-brand-200 sm:inline">See the schedule <span aria-hidden>→</span></span>
        </Link>
        <button type="button" onClick={dismiss} aria-label="Dismiss anniversary announcement" className="absolute right-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full hover:bg-white/10 focus-visible:outline-white sm:right-4">
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </aside>
  );
}
