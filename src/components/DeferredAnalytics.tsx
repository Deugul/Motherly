"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { GA4_MEASUREMENT_ID, META_PIXEL_ID } from "@/lib/analytics-ids";

const INTERACTION_EVENTS = ["scroll", "pointerdown", "keydown", "touchstart"] as const;

/**
 * GA4 and the Meta pixel are held back until the visitor actually engages, or
 * until the page is being backgrounded/unloaded. Loading them during the initial
 * paint costs main-thread blocking time and drags Best Practices down (the tags
 * set third-party cookies), so the gate below is what keeps both Performance
 * and Best Practices high.
 *
 * GTM is deliberately *not* gated here — it loads unwrapped from <head> in the
 * root layout so container tags fire on page view rather than on first
 * interaction.
 *
 * The exit trigger is what preserves bounce tracking: a visitor who never
 * scrolls or taps still gets counted when they switch tabs or leave.
 */
export default function DeferredAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) return;

    const enable = () => {
      setEnabled(true);
      teardown();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") enable();
    };

    function teardown() {
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, enable));
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", enable);
    }

    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, enable, { once: true, passive: true }),
    );
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", enable, { once: true });

    return teardown;
  }, [enabled]);

  if (!enabled) return null;

  // Mounting is the gate, so these inject immediately rather than waiting for
  // another idle callback — an idle slot may never arrive on the exit path.
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}');
        `}
      </Script>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}
