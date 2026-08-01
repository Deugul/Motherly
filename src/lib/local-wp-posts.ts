/**
 * Offline WordPress post fallback extracted from Hostinger SQL backup
 * (u101628071_nhwAU). Used when the live WP REST API is unreachable.
 */

import localDump from "@/data/local-wp-posts.json";

export type LocalWpPostRecord = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  status: string;
  link: string;
  featuredImage: string;
  category: string;
  author: string;
};

type LocalDump = {
  posts: LocalWpPostRecord[];
};

const dump = localDump as LocalDump;

/** Shape compatible with blog pages / featured-image / SEO helpers. */
export type LocalWpPost = {
  id: number;
  status: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  motherly_featured_image_url: string | null;
  _embedded: {
    "wp:featuredmedia": Array<{ source_url: string; alt_text: string }>;
    "wp:term": Array<Array<{ id: number; name: string; taxonomy: string }>>;
    author: Array<{ name: string }>;
  };
};

function toWpPost(record: LocalWpPostRecord): LocalWpPost {
  return {
    id: record.id,
    status: record.status || "publish",
    slug: record.slug,
    title: { rendered: record.title },
    content: { rendered: record.content },
    excerpt: { rendered: record.excerpt },
    date: record.date,
    link: record.link,
    motherly_featured_image_url: record.featuredImage || null,
    _embedded: {
      "wp:featuredmedia": record.featuredImage
        ? [{ source_url: record.featuredImage, alt_text: record.title }]
        : [],
      "wp:term": [
        [{ id: 0, name: record.category || "Article", taxonomy: "category" }],
      ],
      author: [{ name: record.author || "Motherly Team" }],
    },
  };
}

const postsBySlug = new Map<string, LocalWpPost>();
const postsById = new Map<number, LocalWpPost>();
const allPosts: LocalWpPost[] = [];

for (const record of dump.posts ?? []) {
  if (!record?.slug) continue;
  const post = toWpPost(record);
  allPosts.push(post);
  postsBySlug.set(post.slug.toLowerCase(), post);
  postsById.set(post.id, post);
}

/** Newest first (JSON is already sorted; keep stable). */
export function listLocalWpPosts(): LocalWpPost[] {
  return allPosts;
}

export function getLocalWpPostBySlug(slug: string): LocalWpPost | null {
  const key = slug.trim().toLowerCase();
  if (!key) return null;
  return postsBySlug.get(key) ?? null;
}

export function getLocalWpPostById(id: number): LocalWpPost | null {
  return postsById.get(id) ?? null;
}

export function getLocalRelatedWpPosts(
  currentSlug: string,
  limit = 3
): LocalWpPost[] {
  const current = currentSlug.trim().toLowerCase();
  return allPosts.filter((p) => p.slug.toLowerCase() !== current).slice(0, limit);
}
