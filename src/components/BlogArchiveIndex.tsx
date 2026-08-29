"use client";

import { useState } from "react";
import Link from "next/link";

export type ArchiveLink = {
  href: string;
  title: string;
};

const PAGE_SIZE = 3;

/**
 * Index of every published article, collapsed to three visible links behind
 * the same "Load More Articles" button the card grid uses. Each click
 * reveals three more links (3 → 6 → 9 …) rather than the whole catalogue.
 *
 * The card grid above it starts at three cards behind a "Load More" button,
 * so the HTML Googlebot receives from it carries only three crawlable
 * `/blogs/…` links — every other post is reachable from the sitemap alone,
 * which is why most of them sat at "Discovered – currently not indexed".
 * This list keeps that fixed: every anchor is rendered in the server HTML
 * (client components are still pre-rendered), and collapsing is done with
 * the `hidden` attribute so the whole archive stays one request away from
 * `/blogs` for crawlers while readers see three links until they load more.
 */
export default function BlogArchiveIndex({ posts }: { posts: ArchiveLink[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (posts.length === 0) return null;

  const hasMore = posts.length > visibleCount;

  return (
    <nav
      aria-label="All articles"
      className="mt-20 pt-10 border-t"
      style={{ borderColor: "var(--color-surface-container-high)" }}
    >
      <h2
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
      >
        All Articles
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
        Browse every guide from the Motherly care team — {posts.length} articles.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
        {posts.map((post, index) => (
          <li key={post.href} hidden={index >= visibleCount}>
            <Link
              href={post.href}
              className="block py-1.5 text-sm leading-snug transition-colors hover:underline"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            className="px-10 py-4 rounded-xl font-bold transition-colors"
            style={{
              backgroundColor: "var(--color-surface-container-low)",
              color: "var(--color-on-surface-variant)",
              fontFamily: "var(--font-headline)",
              boxShadow: "0 12px 32px rgba(45,52,53,0.06)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-surface-container-high)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-surface-container-low)"; }}
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Load More Articles
          </button>
        </div>
      )}
    </nav>
  );
}
