/** Icons used across the site — keep sorted alphabetically for Google Fonts subset API. */
export const MATERIAL_SYMBOL_ICONS = [
  "accessibility_new",
  "arrow_forward",
  "assignment_ind",
  "baby_changing_station",
  "bedtime",
  "breastfeeding",
  "calendar_month",
  "call",
  "check_circle",
  "child_care",
  "child_friendly",
  "close",
  "diversity_2",
  "error",
  "family_restroom",
  "favorite",
  "female",
  "fitness_center",
  "group",
  "groups",
  "healing",
  "health_and_safety",
  "home_health",
  "image",
  "info",
  "interpreter_mode",
  "keyboard_arrow_down",
  "local_hospital",
  "location_on",
  "lock",
  "mail",
  "map",
  "medical_information",
  "menu_book",
  "nutrition",
  "payments",
  "pediatrics",
  "person_heart",
  "person_search",
  "phone",
  "physical_therapy",
  "pregnancy",
  "pregnant_woman",
  "progress_activity",
  "psychology",
  "refresh",
  "restaurant",
  "schedule",
  "search",
  "self_improvement",
  "send",
  "sentiment_satisfied",
  "spa",
  "star",
  "stethoscope",
  "stroller",
  "touch_app",
  "trending_up",
  "verified",
  "verified_user",
  "videocam",
  "water_drop",
  "work",
] as const;

/** ~17 KiB subset instead of the full ~3.8 MiB variable font. */
export const MATERIAL_SYMBOLS_STYLESHEET_URL =
  `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0` +
  `&icon_names=${MATERIAL_SYMBOL_ICONS.join(",")}` +
  `&display=swap`;

let loadPromise: Promise<void> | null = null;
let ready = false;
const readyListeners = new Set<() => void>();

function notifyReady() {
  if (ready) return;
  ready = true;
  readyListeners.forEach((listener) => listener());
  readyListeners.clear();
}

export function isMaterialSymbolsReady() {
  return ready;
}

export function onMaterialSymbolsReady(listener: () => void) {
  if (ready) {
    listener();
    return () => {};
  }
  readyListeners.add(listener);
  return () => readyListeners.delete(listener);
}

export function loadMaterialSymbols(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  if (ready) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve) => {
    const finish = () => {
      notifyReady();
      resolve();
    };

    if (document.querySelector(`link[href="${MATERIAL_SYMBOLS_STYLESHEET_URL}"]`)) {
      document.fonts.load('1em "Material Symbols Outlined"').then(finish).catch(finish);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = MATERIAL_SYMBOLS_STYLESHEET_URL;
    link.onload = () => {
      document.fonts.load('1em "Material Symbols Outlined"').then(finish).catch(finish);
    };
    link.onerror = finish;
    document.head.appendChild(link);
  });

  return loadPromise;
}
