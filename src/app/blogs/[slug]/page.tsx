import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WpContent from "@/components/WpContent";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const WP_API = "https://beige-swallow-278886.hostingersite.com/wp-json/wp/v2";
const WP_ORIGIN = "https://beige-swallow-278886.hostingersite.com";

type WpPost = {
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text?: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string }>>;
    author?: Array<{ name: string }>;
  };
};

type RelatedPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

async function getPost(slug: string): Promise<WpPost | null> {
  try {
    const res = await fetch(
      `${WP_API}/posts?slug=${encodeURIComponent(slug)}&_embed`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const posts: WpPost[] = await res.json();
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

async function getRelatedPosts(currentSlug: string): Promise<RelatedPost[]> {
  try {
    const res = await fetch(
      `${WP_API}/posts?_embed&per_page=4&orderby=date&order=desc`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const posts: WpPost[] = await res.json();
    return posts
      .filter((p) => p.slug !== currentSlug)
      .slice(0, 3)
      .map((p) => ({
        slug: p.slug,
        title: stripHtml(p.title.rendered),
        excerpt: stripHtml(p.excerpt.rendered).slice(0, 120),
        image: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
        category: (p._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Article").toUpperCase(),
        date: new Date(p.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      }));
  } catch {
    return [];
  }
}

const REAL_DOMAIN = "mothrly.com";

function sanitizeWpHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(
      /(<img\b[^>]*?)\ssrc="data:image\/svg\+xml[^"]*"([^>]*?)\sdata-opt-src="([^"]*)"/gi,
      "$1 src=\"$3\"$2"
    )
    .replace(
      /(<img\b[^>]*?)\sdata-opt-src="([^"]*)"([^>]*?)\ssrc="data:image\/svg\+xml[^"]*"/gi,
      "$1 src=\"$2\"$3"
    )
    .replace(/\bold-srcset=/gi, "srcset=")
    .replace(
      new RegExp(`href="${WP_ORIGIN.replace(/\./g, "\\.")}/(?:[\\w-]+/)*([\\w-]+)/?(?:\\?[^"]*)?"`, "gi"),
      'href="/blogs/$1"'
    )
    // Replace every visible occurrence of the staging domain with the real domain
    .replace(/beige-swallow-278886\.hostingersite\.com/gi, REAL_DOMAIN);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const title = stripHtml(post.title.rendered);
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 160).trim();
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return {
    title,
    description,
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getPost(slug),
    getRelatedPosts(slug),
  ]);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="pt-40 pb-20 max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--color-on-surface)" }}>
            Post not found
          </h1>
          <Link href="/blogs" className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
            ← Back to Blogs
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const title = stripHtml(post.title.rendered);
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const altText = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || title;
  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
  const author = post._embedded?.author?.[0]?.name ?? "Motherly Team";
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20" style={{ backgroundColor: "var(--color-background)" }}>
        <article
          className="max-w-7xl mx-auto"
          style={{
            padding: "2.5rem 2rem",
            backgroundColor: "var(--color-surface-container-lowest)",
            borderRadius: "1.5rem",
            boxShadow: "0 4px 24px rgba(45,52,53,0.07)",
          }}
        >
          {/* Back */}
          <div className="mb-8">
            <Link
              href="/blogs"
              style={{
                color: "var(--color-primary)",
                fontSize: "0.875rem",
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                opacity: 1,
              }}
            >
              ← Back to Blogs
            </Link>
          </div>

          {/* Category */}
          {category && (
            <span
              style={{
                color: "var(--color-primary)",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "var(--font-body)",
              }}
            >
              {category}
            </span>
          )}

          {/* Title */}
          <h1
            style={{
              marginTop: "0.75rem",
              fontFamily: "var(--font-headline)",
              color: "var(--color-on-surface)",
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>

          {/* Meta */}
          <div
            style={{
              marginTop: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.875rem",
              color: "var(--color-on-surface-variant)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span>{author}</span>
            <span>·</span>
            <span>{date}</span>
          </div>

          {/* Featured image */}
          {image && (
            <div className="mt-8 rounded-2xl overflow-hidden relative aspect-video">
              <Image src={image} alt={altText} fill className="object-contain object-top" priority />
            </div>
          )}

          {/* WordPress content — WpContent is a client component that re-attaches FAQ accordion */}
          <WpContent html={sanitizeWpHtml(post.content.rendered)} />
        </article>

        {/* Keep Reading */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto mt-16" style={{ padding: "0 2rem" }}>
            <h2
              className="text-2xl md:text-3xl font-extrabold mb-8"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
            >
              Keep Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blogs/${rp.slug}`}
                  className="related-post-card group rounded-2xl overflow-hidden block"
                  style={{
                    backgroundColor: "var(--color-surface-container-lowest)",
                    boxShadow: "0 4px 20px rgba(45,52,53,0.08)",
                    textDecoration: "none",
                  }}
                >
                  {/* Inset image */}
                  <div style={{ padding: "8px 8px 0 8px" }}>
                    <div style={{ borderRadius: "12px", overflow: "hidden", position: "relative", height: "250px" }}>
                      {rp.image ? (
                        <Image
                          src={rp.image}
                          alt={rp.title}
                          fill
                          style={{ objectFit: "contain", objectPosition: "top" }}
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: "var(--color-surface-container-high)" }}
                        >
                          <span className="material-symbols-outlined text-5xl" style={{ color: "var(--color-on-surface-variant)", opacity: 0.3 }}>
                            image
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="px-4 pb-5 pt-3 space-y-2">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 30%, transparent)",
                        color: "var(--color-on-secondary-container)",
                      }}
                    >
                      {rp.category}
                    </span>
                    <h3
                      className="text-base font-bold leading-snug"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                    >
                      {rp.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed line-clamp-3"
                      style={{ color: "var(--color-on-surface-variant)" }}
                    >
                      {rp.excerpt}
                    </p>
                    <p className="text-xs pt-1" style={{ color: "var(--color-on-surface-variant)" }}>
                      {rp.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
