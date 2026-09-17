import { domAnimation } from "framer-motion";

// Loaded lazily by MotionProvider. domAnimation covers everything the site
// uses — animate/variants, exit + AnimatePresence, whileInView, whileHover,
// whileTap. Nothing uses `layout` or `drag`, which would need domMax.
export default domAnimation;
