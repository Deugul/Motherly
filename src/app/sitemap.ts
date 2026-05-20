import type { MetadataRoute } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { BLOG_SEO } from "@/data/blog-seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "https://www.mothrly.com";

const EXCLUDED_SEGMENTS = new Set(["keystatic", "blog-admin"]);

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

function buildBlogEntries(now: Date): MetadataRoute.Sitemap {
  return Object.keys(BLOG_SEO).map((slug) => ({
    url: `${BASE_URL}/blogs/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
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

  return [...buildStaticEntries(dedupedRoutes, now), ...buildBlogEntries(now)];
}
