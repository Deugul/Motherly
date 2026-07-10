"use client";

import { useEffect } from "react";
import { loadMaterialSymbols } from "@/lib/material-symbols";

const LOAD_DELAY_MS = 1500;

export default function FontLoader() {
  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;

    const run = () => {
      if (!cancelled) void loadMaterialSymbols();
    };

    const scheduleLoad = () => {
      timeoutId = window.setTimeout(run, LOAD_DELAY_MS);
    };

    if (document.readyState === "complete") {
      scheduleLoad();
    } else {
      window.addEventListener("load", scheduleLoad, { once: true });
    }

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
