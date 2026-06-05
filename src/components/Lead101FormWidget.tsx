"use client";

import { useEffect, useRef } from "react";

const WIDGET_CODE = "76D592429720";
const CONTAINER_ID = "motherly-lead101-form";
const SCRIPT_SRC = `https://api.thelead101.com/api/v1/public/form-widget.js?code=${WIDGET_CODE}`;

const LEGACY_WIDGET_CODES = ["052359C37694", "C868A36BCCE9"];

export default function Lead101FormWidget() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const container = document.getElementById(CONTAINER_ID);
    if (!container) return;

    if (wrapper.dataset.mounted === "true") return;
    wrapper.dataset.mounted = "true";

    document.querySelectorAll("script[data-motherly-lead101]").forEach((el) => el.remove());
    container.replaceChildren();

    if (window.__formWidgetInitialized) {
      delete window.__formWidgetInitialized[WIDGET_CODE];
      for (const code of LEGACY_WIDGET_CODES) {
        delete window.__formWidgetInitialized[code];
      }
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.setAttribute("data-motherly-lead101", "true");
    script.setAttribute("data-widget-code", WIDGET_CODE);
    script.setAttribute("data-container-id", CONTAINER_ID);
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-height", "370px");
    script.setAttribute("data-primary-color", "#3b82f6");
    script.setAttribute("data-secondary-color", "#f3f4f6");
    script.setAttribute("data-border-radius", "1px");
    script.setAttribute("data-shadow", "0 4px 6px -1px rgba(0, 0, 0, 0.1)");

    wrapper.appendChild(script);
  }, []);

  return (
    <div ref={wrapperRef} className="w-full leading-none [&_.form-widget-host]:mb-0">
      <div
        id={CONTAINER_ID}
        className="form-widget-host w-full"
        style={{ width: "100%" }}
      />
    </div>
  );
}

declare global {
  interface Window {
    __formWidgetInitialized?: Record<string, boolean>;
  }
}
