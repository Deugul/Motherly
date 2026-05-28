import type { MetadataRoute } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { BLOG_SEO } from "@/data/blog-seo";
import { SERVICE_SEO } from "@/data/service-seo";
import { fetchWordPress } from "@/lib/wordpress";

import { SITE_ORIGIN } from "@/lib/site-url";

const BASE_URL = SITE_ORIGIN;

const EXCLUDED_SEGMENTS = new Set(["keystatic", "blog-admin"]);

/** Routes that 308 to a canonical service URL — omit from sitemap. */
const LEGACY_SERVICE_ALIASES = new Set([
  "/services/lactation",
  "/services/postnatal",
  "/services/nannies",
  "/services/gynecologist",
  "/services/gynaecology",
  "/services/gynecology-consultation",
]);

const CANONICAL_SERVICE_PATHS = new Set<string>(
  Object.values(SERVICE_SEO).map((entry) => entry.path),
);

function toRouteFromPageFile(filePath: string): string {
  const relativePath = path.relative(path.join(process.cwd(), "src", "app"), filePath);
  const routePath = relativePath.replace(/\\/g, "/").replace(/\/page\.tsx$/, "");
  return routePath === "" ? "/" : `/${routePath}`;
}

function isExcludedRoute(route: string): boolean {
  const segments = route.split("/").filter(Boolean);
  if (segments.length === 0) {
    return false;
  }
  if (LEGACY_SERVICE_ALIASES.has(route)) {
    return true;
  }
  if (CANONICAL_SERVICE_PATHS.has(route)) {
    return true;
  }
  if (route.startsWith("/our-services1")) {
    return true;
  }
  return (
    segments.some((segment) => segment.startsWith("(") || segment.startsWith("_")) ||
    segments.some((segment) => segment.includes("[") || segment.includes("]")) ||
    segments.some((segment) => EXCLUDED_SEGMENTS.has(segment))
  );
}

async function collectStaticRoutes(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const discoveredRoutes: string[] = [];

  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(root, entry.name);
      if (entry.isDirectory()) {
        const nestedRoutes = await collectStaticRoutes(fullPath);
        discoveredRoutes.push(...nestedRoutes);
        return;
      }
      if (entry.isFile() && entry.name === "page.tsx") {
        const route = toRouteFromPageFile(fullPath);
        if (!isExcludedRoute(route)) {
          discoveredRoutes.push(route);
        }
      }
    }),
  );

  return discoveredRoutes;
}

function buildStaticEntries(staticRoutes: string[], now: Date): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/" || route.startsWith("/services") ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/services") ? 0.9 : 0.7,
  }));
}

function buildServiceEntries(now: Date): MetadataRoute.Sitemap {
  return Object.values(SERVICE_SEO).map((entry) => ({
    url: entry.canonical,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
}

type SitemapWpPost = {
  slug?: string;
  modified?: string;
  date?: string;
  status?: string;
};

async function fetchAllWordPressBlogPosts(): Promise<SitemapWpPost[]> {
  const posts: SitemapWpPost[] = [];
  const perPage = 100;

  for (let page = 1; page <= 20; page += 1) {
    const params = new URLSearchParams({
      per_page: String(perPage),
      page: String(page),
      orderby: "date",
      order: "desc",
      _fields: "slug,modified,date,status",
    });
    const { data, ok } = await fetchWordPress<SitemapWpPost[]>("/posts", params);
    if (!ok || !Array.isArray(data) || data.length === 0) break;
    posts.push(...data);
    if (data.length < perPage) break;
  }

  return posts;
}

async function buildBlogEntries(now: Date): Promise<MetadataRoute.Sitemap> {
  const wpPosts = await fetchAllWordPressBlogPosts();
  const blogMap = new Map<string, Date>();

  for (const post of wpPosts) {
    if (post.status && post.status !== "publish") continue;
    const slug = post.slug?.trim();
    if (!slug) continue;
    const lastModified = post.modified ?? post.date;
    const parsedDate = lastModified ? new Date(lastModified) : now;
    blogMap.set(
      `${BASE_URL}/blogs/${slug}`,
      Number.isNaN(parsedDate.getTime()) ? now : parsedDate,
    );
  }

  if (blogMap.size === 0) {
    for (const slug of Object.keys(BLOG_SEO)) {
      blogMap.set(`${BASE_URL}/blogs/${slug}`, now);
    }
  }

  return Array.from(blogMap.entries()).map(([url, lastModified]) => ({
    url,
    lastModified,
    changeFrequency: "daily",
    priority: 0.8,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const appRoot = path.join(process.cwd(), "src", "app");
  const staticRoutes = await collectStaticRoutes(appRoot);
  const dedupedRoutes = Array.from(new Set(staticRoutes)).sort((left, right) =>
    left.localeCompare(right),
  );

  const blogEntries = await buildBlogEntries(now);

  return [
    ...buildStaticEntries(dedupedRoutes, now),
    ...buildServiceEntries(now),
    ...blogEntries,
  ];
}
