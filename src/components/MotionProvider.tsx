"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

// Start fetching the animation features as soon as this module evaluates —
// in parallel with hydration — instead of from LazyMotion's mount effect.
const features = import("@/lib/motion-features").then((mod) => mod.default);

/**
 * Components import `m` (aliased as `motion` so call sites read unchanged)
 * instead of the full `motion` component, which bundles every animation
 * feature up front. The features load here asynchronously, taking most of
 * framer-motion off the critical path; elements render their `initial` state
 * from the server as before and start animating once the features arrive.
 *
 * `strict` makes a plain `motion` import throw in development, since one would
 * silently pull the full bundle back in. `reducedMotion="user"` drops transform
 * animations for visitors who ask for reduced motion and changes nothing for
 * everyone else.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={() => features} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
