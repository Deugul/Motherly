"use client";

import { motion } from "framer-motion";
import type { MouseEvent } from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.mothrly&pcampaignid=web_share";
const APP_STORE_URL =
  "https://apps.apple.com/in/app/motherly-birth-companion/id6746041100";

/**
 * iPadOS 13+ reports platform "MacIntel" and drops "iPad" from the user agent,
 * so the second clause is required or iPad visitors get sent to the Play Store
 * for an app they cannot install. maxTouchPoints separates iPad from a real Mac.
 */
function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return true;
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}

type Variant = "hero" | "card";

export default function AppDownloadButton({
  variant = "hero",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  // The href is always the Play Store so server and client markup match exactly.
  // Only iOS needs a branch; Android and desktop fall through to the href.
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isIOS()) return;
    event.preventDefault();
    window.open(APP_STORE_URL, "_blank", "noopener,noreferrer");
  };

  const sizing =
    variant === "hero"
      ? "w-full sm:w-auto px-8 py-3.5 text-base"
      : "px-7 py-3 text-sm";

  return (
    <motion.a
      href={PLAY_STORE_URL}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all ${sizing} ${className}`}
      style={{
        fontFamily: "var(--font-headline)",
        background: "linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)",
        color: "var(--color-on-primary)",
        boxShadow:
          "0 8px 24px color-mix(in srgb, var(--color-primary) 25%, transparent)",
      }}
    >
      Download the Motherly App
    </motion.a>
  );
}
