"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function WebinarTopBar() {
  const pathname = usePathname();

  // Hide the announcement banner if the user is already on the webinar page
  if (pathname.startsWith("/webinar")) {
    return null;
  }

  const tickerItems = [
    {
      badge: "🔥 LIVE WEBINAR",
      text: "Breastfeeding Made Easy with Dr. Varshika.S",
      date: "22nd November 2026, 11:00 AM",
      offer: "ONLY ₹99 (95% OFF)",
      cta: "Register Now →",
    },
    {
      badge: "✨ EXPERT MASTERCLASS",
      text: "Master Latching, Pain-Free Positions & Milk Supply Solutions",
      date: "22nd Nov, 11:00 AM – 12:30 PM",
      offer: "Special Fee ₹99",
      cta: "Book Your Spot →",
    },
    {
      badge: "⭐ LIMITED SEATS",
      text: "Includes 90-Min Live Masterclass + Q&A + Lifetime Recording Access",
      date: "22nd November 2026",
      offer: "Save ₹1,701 Today",
      cta: "Click to Join →",
    },
  ];

  return (
    <aside aria-label="Webinar Announcement">
      <Link
        href="/webinar/Breastfeeding-Made-Easy"
        className="group relative block w-full overflow-hidden py-1 sm:py-1.5 px-3 select-none shadow-xs hover:brightness-110 active:opacity-95 transition-all"
        style={{
          background: "linear-gradient(90deg, #780234 0%, #ba0e56 25%, #e11d68 55%, #ba0e56 80%, #780234 100%)",
        }}
      >
        <div className="flex w-max items-center whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {/* Render two identical tracks for continuous infinite marquee looping */}
          {[1, 2].map((trackIdx) => (
            <div key={trackIdx} className="flex items-center gap-6 sm:gap-10 px-2 sm:px-4">
              {tickerItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 sm:gap-3">
                  {/* High Visibility Bright Gold Badge */}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-amber-400 text-neutral-950 shadow-xs border border-amber-300">
                    {item.badge}
                  </span>

                  {/* High Contrast Pure White Headline */}
                  <span className="font-extrabold text-white text-[11px] sm:text-xs tracking-tight drop-shadow-xs">
                    {item.text}
                  </span>

                  <span className="text-amber-300 font-extrabold text-xs">•</span>

                  {/* Date Tag */}
                  <span className="bg-white/20 text-white px-2 py-0.2 rounded-full font-bold text-[10px] sm:text-[11px] border border-white/20">
                    {item.date}
                  </span>

                  <span className="text-amber-300 font-extrabold text-xs">•</span>

                  {/* Price Tag with Yellow Border */}
                  <span className="font-black text-amber-200 bg-black/40 px-2 py-0.5 rounded-full text-[11px] sm:text-xs border border-amber-300/60 shadow-xs">
                    {item.offer}
                  </span>

                  <span className="text-amber-300 font-extrabold text-xs">•</span>

                  {/* High Visibility White Button CTA */}
                  <span className="inline-flex items-center gap-1 font-black bg-white text-[#9c1f52] px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] shadow-xs group-hover:bg-amber-300 group-hover:text-black transition-all">
                    <span>{item.cta}</span>
                  </span>

                  <span className="text-amber-300/60 font-black pl-2 text-xs">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Link>
    </aside>
  );
}
