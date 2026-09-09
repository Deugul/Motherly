import type { Metadata } from "next";
import { SITE_ORIGIN, ensureCanonicalOrigin } from "./site-url";

/** Organisation name used for DC.publisher. */
export const DC_PUBLISHER = "Motherly";

/** Dublin Core language code (BCP-47, India English). */
export const DC_LANGUAGE = "en-IN";

/** hreflang value — lowercase per the hreflang spec. */
export const HREFLANG = "en-in";

/** Chennai office coordinates, shared by geo.position and ICBM. */
const GEO_POSITION = "12.84236971761543, 80.22651263719975";

const GEO_META = {
  "geo.region": "IN-TN",
  "geo.placename": "Chennai",
  "geo.position": GEO_POSITION,
  ICBM: GEO_POSITION,
} as const;

/**
 * DC.type per page kind: the homepage is Text.Homepage, blog posts are
 * Text.Article, and every other content page is Text.Webpage.
 */
export type DcType = "Text.Homepage" | "Text.Article" | "Text.Webpage";

/**
 * The root layout declares the title template `%s | Motherly`. Next.js applies
 * it to segments whose closest ancestor title config still carries a template —
 * so it reaches /about-us, /doctors, /services and the policy pages, but *not*
 * /services/* or /blogs/[slug], because /services/layout.tsx and
 * /blogs/layout.tsx each define a plain-string title, which replaces the
 * template for their children.
 *
 * DC.title has to mirror the rendered <title>, so pages that inherit the
 * template wrap their title here; the ones that don't pass their title through
 * unchanged.
 */
export function brandedTitle(title: string): string {
  return `${title} | ${DC_PUBLISHER}`;
}

/** Resolve a canonical value (path or absolute URL) to an absolute www URL. */
function toAbsoluteUrl(canonical: string): string {
  if (/^https?:\/\//i.test(canonical)) {
    return ensureCanonicalOrigin(canonical);
  }
  return `${SITE_ORIGIN}${canonical.startsWith("/") ? "" : "/"}${canonical}`;
}

export type HeadSeoInput = {
  /** The page's rendered <title> — see {@link brandedTitle}. */
  title: string;
  /** The page's meta description, verbatim. */
  description: string;
  /**
   * The page's canonical, in whatever form the page already declares it
   * (relative path or absolute URL). Passed through to `alternates.canonical`
   * unchanged; the absolute form drives DC.identifier and the hreflang href.
   */
  canonical: string;
  dcType: DcType;
};

/**
 * Dublin Core + geo meta and the self-referencing `en-in` hreflang for one page.
 *
 * Metadata objects are merged *shallowly* across segments, so `alternates` and
 * `other` set anywhere below the root layout replace the root's copies wholesale.
 * That is why this returns both keys together and every page in scope has to
 * spread it rather than inherit it.
 */
export function buildHeadSeo({
  title,
  description,
  canonical,
  dcType,
}: HeadSeoInput): Pick<Metadata, "alternates" | "other"> {
  const absoluteUrl = toAbsoluteUrl(canonical);

  return {
    alternates: {
      canonical,
      languages: { [HREFLANG]: absoluteUrl },
    },
    other: {
      "DC.title": title,
      "DC.description": description,
      "DC.publisher": DC_PUBLISHER,
      "DC.language": DC_LANGUAGE,
      "DC.type": dcType,
      "DC.identifier": absoluteUrl,
      ...GEO_META,
    },
  };
}
