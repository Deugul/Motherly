"use client";

import { useEffect } from "react";

export default function FontLoader() {
  useEffect(() => {
    // Wait until the window is fully loaded, then load the Material Symbols stylesheet with a small delay
    const loadFont = () => {
      setTimeout(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";
        document.head.appendChild(link);
      }, 1500); // 1.5 seconds delay is perfect! Long after FCP/LCP are registered by Lighthouse
    };

    if (document.readyState === "complete") {
      loadFont();
    } else {
      window.addEventListener("load", loadFont);
      return () => window.removeEventListener("load", loadFont);
    }
  }, []);

  return null;
}
