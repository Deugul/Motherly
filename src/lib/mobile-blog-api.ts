import { getBlogSeo } from "@/data/blog-seo";
import {
  getAbsoluteImageUrl,
  getBlogImageProps,
  localiseImageUrls,
  neutraliseDeadImageUrls,
} from "@/lib/blog-image-manifest";
import {
  getLocalRelatedWpPosts,
  getLocalWpPostById,
  getLocalWpPostBySlug,
  listLocalWpPosts,
} from "@/lib/local-wp-posts";
import { restoreWpBlocks } from "@/lib/restore-wp-blocks";
import { SITE_ORIGIN } from "@/lib/site-url";
import { stripWpFaqSchemaFromHtml } from "@/lib/strip-wp-faq-schema";
import { getWordPressPostBodyHtml } from "@/lib/wordpress-content";
import {
  demoteContentHeadings,
  resolveBlogPostSeo,
  resolvePostCardExcerpt,
  type RankMathSeoFromWp,
} from "@/lib/wordpress-seo";
import {
  fetchWordPress,
  getWordPressBlogMode,
  isWordPressPostIdSegment,
  pickWordPressPostBySlug,
  WP_ORIGIN,
} from "@/lib/wordpress";
import { resolveFeaturedImageUrl } from "@/lib/wordpress-featured-image";

export type MobileBlogListItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  featuredImageWidth: number | null;
  featuredImageHeight: number | null;
  category: string;
  author: string;
  date: string;
  dateFormatted: string;
  url: string;
};

export type MobileBlogPostDetail = MobileBlogListItem & {
  contentHtml: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    h1: string;
    canonical: string;
  };
  related: MobileBlogListItem[];
};

type WpPost = {
  id?: number;
  status?: string;
  slug: string;
  title: { rendered: string };
  content?: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link?: string;
  featured_media?: number;
  motherly_featured_image_url?: string | null;
  motherly_content_html?: string | null;
  rank_math_seo?: RankMathSeoFromWp | null;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string; code?: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string; taxonomy?: string }>>;
    author?: Array<{ name: string }>;
  };
};

function stripHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<(script|style|noscript|template|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function blogUrl(slug: string): string {
  return `${SITE_ORIGIN}/blogs/${slug}`;
}

function sanitizeWpHtml(html: string): string {
  return html
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(
      /(<img\b[^>]*?)\ssrc="data:image\/svg\+xml[^"]*"([^>]*?)\sdata-opt-src="([^"]*)"/gi,
      '$1 src="$3"$2'
    )
    .replace(
      /(<img\b[^>]*?)\sdata-opt-src="([^"]*)"([^>]*?)\ssrc="data:image\/svg\+xml[^"]*"/gi,
      '$1 src="$2"$3'
    )
    .replace(/\bold-srcset=/gi, "srcset=")
    .replace(
      new RegExp(`href="${WP_ORIGIN.replace(/\./g, "\\.")}/contact-us/?"`, "gi"),
      'href="/contact-us"'
    )
    .replace(/beige-swallow-278886\.hostingersite\.com/gi, "mothrly.com");
}

function stripExportedHtmlDocumentShell(html: string): string {
  return html
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<\/?html[^>]*>/gi, "")
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<\/?body[^>]*>/gi, "");
}

function prepareContentHtml(post: WpPost): string {
  const raw = sanitizeWpHtml(stripExportedHtmlDocumentShell(getWordPressPostBodyHtml(post)));
  const withoutFaq = stripWpFaqSchemaFromHtml(raw);
  const demoted = demoteContentHeadings(withoutFaq);
  const localised = localiseImageUrls(demoted);
  const neutralised = neutraliseDeadImageUrls(localised, post.slug);
  const restored = restoreWpBlocks(neutralised);

  // Mobile clients need absolute image URLs inside HTML.
  return restored.replace(
    /\ssrc="(\/[^"]+)"/gi,
    (_match, path: string) => ` src="${SITE_ORIGIN}${path}"`
  );
}

async function resolveFeaturedImage(post: WpPost): Promise<string> {
  const remote =
    post.motherly_featured_image_url?.trim() ||
    (await resolveFeaturedImageUrl(post)) ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url?.trim() ||
    "";
  const props = getBlogImageProps(remote, stripHtml(post.title.rendered), {
    width: 1200,
    height: 500,
    seed: post.slug,
  });
  const src = props?.src ?? remote;
  return getAbsoluteImageUrl(src, SITE_ORIGIN);
}

async function toListItem(post: WpPost): Promise<MobileBlogListItem> {
  const title = stripHtml(post.title.rendered);
  const featuredImage = await resolveFeaturedImage(post);
  const props = getBlogImageProps(featuredImage, title, {
    width: 1200,
    height: 500,
    seed: post.slug,
  });

  return {
    id: post.id ?? 0,
    slug: post.slug,
    title,
    excerpt: resolvePostCardExcerpt(post, 200),
    featuredImage,
    featuredImageWidth: props?.width ?? null,
    featuredImageHeight: props?.height ?? null,
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Article",
    author: post._embedded?.author?.[0]?.name ?? "Motherly Team",
    date: post.date,
    dateFormatted: formatDate(post.date),
    url: blogUrl(post.slug),
  };
}

async function fetchRemotePosts(perPage = 100): Promise<WpPost[]> {
  const params = new URLSearchParams({
    _embed: "",
    per_page: String(perPage),
    orderby: "date",
    order: "desc",
    _fields:
      "id,slug,title,excerpt,content,date,link,status,featured_media,motherly_featured_image_url,motherly_content_html,rank_math_seo,_links,_embedded",
  });

  const { data, ok } = await fetchWordPress<WpPost[]>("/posts", params);
  if (!ok || !Array.isArray(data) || data.length === 0) return [];

  const images = await Promise.all(data.map((p) => resolveFeaturedImageUrl(p)));
  return data.map((p, index) => ({
    ...p,
    motherly_featured_image_url:
      p.motherly_featured_image_url?.trim() || images[index] || null,
  }));
}

async function getAllPosts(): Promise<WpPost[]> {
  try {
    const remote = await fetchRemotePosts();
    if (remote.length > 0) return remote;
  } catch {
    /* local fallback */
  }
  return listLocalWpPosts() as WpPost[];
}

async function getPostById(id: string): Promise<WpPost | null> {
  const params = new URLSearchParams({ _embed: "" });
  const { data: post, ok } = await fetchWordPress<WpPost>(`/posts/${id}`, params);
  if (ok && post?.id) {
    if (post.status === "draft" && getWordPressBlogMode() !== "development") {
      return null;
    }
    return post;
  }
  return getLocalWpPostById(Number(id)) as WpPost | null;
}

async function getPost(slugOrId: string): Promise<WpPost | null> {
  if (isWordPressPostIdSegment(slugOrId)) {
    return getPostById(slugOrId);
  }

  const params = new URLSearchParams({ slug: slugOrId, _embed: "" });
  const { data: posts, ok } = await fetchWordPress<WpPost[]>("/posts", params);
  if (ok && posts?.length) {
    return pickWordPressPostBySlug(posts);
  }
  return getLocalWpPostBySlug(slugOrId) as WpPost | null;
}

export async function listMobileBlogPosts(options?: {
  page?: number;
  perPage?: number;
}): Promise<{ posts: MobileBlogListItem[]; total: number; page: number; perPage: number }> {
  const page = Math.max(1, options?.page ?? 1);
  const perPage = Math.min(100, Math.max(1, options?.perPage ?? 20));
  const all = await getAllPosts();
  const start = (page - 1) * perPage;
  const slice = all.slice(start, start + perPage);
  const posts = await Promise.all(slice.map((p) => toListItem(p)));

  return { posts, total: all.length, page, perPage };
}

export async function getMobileBlogPost(
  slug: string
): Promise<MobileBlogPostDetail | null> {
  const post = await getPost(slug);
  if (!post) return null;

  const base = await toListItem(post);
  const resolved = resolveBlogPostSeo(slug, post);
  const staticSeo = getBlogSeo(slug);

  const relatedRemote = (await fetchRemotePosts(4)).filter((p) => p.slug !== slug).slice(0, 3);
  const relatedSource =
    relatedRemote.length > 0
      ? relatedRemote
      : (getLocalRelatedWpPosts(slug, 3) as WpPost[]);

  const related = await Promise.all(relatedSource.map((p) => toListItem(p)));

  return {
    ...base,
    contentHtml: prepareContentHtml(post),
    seo: {
      metaTitle: resolved.metaTitle,
      metaDescription: resolved.metaDescription,
      keywords: resolved.keywords ?? staticSeo?.keywords ?? [],
      h1: resolved.h1,
      canonical: resolved.canonical,
    },
    related,
  };
}
