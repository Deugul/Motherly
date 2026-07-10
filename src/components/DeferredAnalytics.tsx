"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const INTERACTION_EVENTS = ["scroll", "pointerdown", "keydown", "touchstart"] as const;
const FALLBACK_DELAY_MS = 5000;

export default function DeferredAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) return;

    const enable = () => {
      setEnabled(true);
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, enable));
    };

    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, enable, { once: true, passive: true }),
    );

    let fallback: number | undefined;

    fallback = window.setTimeout(enable, FALLBACK_DELAY_MS);

    return () => {
      if (fallback !== undefined) window.clearTimeout(fallback);
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, enable));
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MKFG9J3JPM"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MKFG9J3JPM');
        `}
      </Script>
      <Script id="meta-pixel" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1626727235196727');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}
