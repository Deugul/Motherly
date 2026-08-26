import Link from "next/link";

export type ArchiveLink = {
  href: string;
  title: string;
};

/**
 * Server-rendered index of every published article.
 *
 * The card grid above it is a client component that starts at three cards
 * behind a "Load More" button, so the HTML Googlebot receives carries only
 * three crawlable `/blogs/…` links — every other post is reachable from the
 * sitemap alone, which is why most of them sat at "Discovered – currently not
 * indexed". This list is plain server-rendered anchors, so the whole archive
 * is one click from `/blogs` for both readers and crawlers.
 */
export default function BlogArchiveIndex({ posts }: { posts: ArchiveLink[] }) {
  if (posts.length === 0) return null;

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
        {posts.map((post) => (
          <li key={post.href}>
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
    </nav>
  );
}
