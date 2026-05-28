import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WpContent from "@/components/WpContent";
import BlogSeoExtras from "@/components/BlogSeoExtras";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getBlogSeo, normalizeSeoUrl } from "@/data/blog-seo";
import { SITE_ORIGIN } from "@/lib/site-url";
import { getWordPressPostBodyHtml } from "@/lib/wordpress-content";
import {
  demoteContentHeadings,
  resolveBlogPostSeo,
  type RankMathSeoFromWp,
} from "@/lib/wordpress-seo";
import {
  fetchWordPress,
  getWordPressBlogMode,
  isWordPressPostIdSegment,
  pickWordPressPostBySlug,
  WP_ORIGIN,
} from "@/lib/wordpress";

type WpPost = {
  id?: number;
  status?: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  rank_math_seo?: RankMathSeoFromWp | null;
  /** Elementor HTML when content.rendered is empty (Motherly WP plugin). */
  motherly_content_html?: string | null;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
      title?: { rendered?: string };
    }>;
    "wp:term"?: Array<Array<{ id: number; name: string; taxonomy?: string }>>;
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

async function getPostById(id: string): Promise<WpPost | null> {
  const params = new URLSearchParams({ _embed: "" });
  const { data: post, ok } = await fetchWordPress<WpPost>(`/posts/${id}`, params);
  if (!ok || !post?.id) return null;
  if (post.status === "draft" && getWordPressBlogMode() !== "development") {
    return null;
  }
  return post;
}

async function getPost(slugOrId: string): Promise<WpPost | null> {
  if (isWordPressPostIdSegment(slugOrId)) {
    return getPostById(slugOrId);
  }

  const params = new URLSearchParams({
    slug: slugOrId,
    _embed: "",
  });
  const { data: posts, ok } = await fetchWordPress<WpPost[]>("/posts", params);
  if (!ok || !posts?.length) return null;
  return pickWordPressPostBySlug(posts);
}

async function getRelatedPosts(currentSlug: string): Promise<RelatedPost[]> {
  try {
    const params = new URLSearchParams({
      _embed: "",
      per_page: "4",
      orderby: "date",
      order: "desc",
    });
    const { data: posts, ok } = await fetchWordPress<WpPost[]>("/posts", params);
    if (!ok || !posts) return [];
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
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
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
      new RegExp(`href="${WP_ORIGIN.replace(/\./g, "\\.")}/contact-us/?"`, "gi"),
      'href="/contact-us"'
    )
    .replace(
      new RegExp(
        `href="${WP_ORIGIN.replace(/\./g, "\\.")}/(?:[\\w-]+/)*(?!contact-us|tag|category|author)([\\w-]+)/?(?:\\?[^"]*)?"`,
        "gi"
      ),
      'href="/blogs/$1"'
    )
    // Replace every visible occurrence of the staging domain with the real domain
    .replace(/beige-swallow-278886\.hostingersite\.com/gi, REAL_DOMAIN)
    // Blog CTA: "Explore Motherly" → Contact Us, same-tab navigation
    .replace(
      /<a\b(?=[^>]*\bclass="[^"]*mb-cta-btn[^"]*")[^>]*>/gi,
      (tag) =>
        tag
          .replace(/\bhref="[^"]*"/i, 'href="/contact-us"')
          .replace(/\s+target=(?:"_blank"|'_blank')/gi, "")
          .replace(/\s+rel=(?:"[^"]*"|'[^']*')/gi, "")
    )
    .replace(
      /<a\b(?=[^>]*\bclass="[^"]*mb-store-badge[^"]*")[^>]*\bhref="https:\/\/play\.google\.com[^"]*"/gi,
      (tag) =>
        tag.replace(
          /\bhref="[^"]*"/i,
          'href="https://play.google.com/store/apps/details?id=com.mothrly&hl=en_IN"'
        )
    )
    .replace(
      /<a\b(?=[^>]*\bclass="[^"]*mb-store-badge[^"]*")[^>]*\bhref="https:\/\/apps\.apple\.com[^"]*"/gi,
      (tag) =>
        tag.replace(
          /\bhref="[^"]*"/i,
          'href="https://apps.apple.com/us/app/motherly-your-birth-companion/id6746041100"'
        )
    )
    // Hide WordPress tag pills only (do not match other mb-* blocks)
    .replace(/<div\s+class="mb-tags"[^>]*>\s*(?:<a\b[^>]*>[\s\S]*?<\/a>\s*)*<\/div>/gi, "");
}

function prepareWpContentHtml(html: string): string {
  return demoteContentHeadings(sanitizeWpHtml(html));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const staticSeo = getBlogSeo(slug);
  if (!post && !staticSeo) return { title: "Post Not Found" };

  const resolved = post
    ? resolveBlogPostSeo(slug, post)
    : {
        metaTitle: staticSeo!.metaTitle,
        metaDescription: staticSeo!.metaDescription,
        keywords: staticSeo!.keywords,
        h1: staticSeo!.h1,
        canonical: staticSeo!.canonical,
      };

  const canonical = normalizeSeoUrl(resolved.canonical);
  const image = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const imageAlt =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.alt_text?.trim() || resolved.h1;

  return {
    title: resolved.metaTitle,
    description: resolved.metaDescription,
    keywords: resolved.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "en_IN",
      siteName: "Motherly",
      title: resolved.metaTitle,
      description: resolved.metaDescription,
      url: canonical,
      images: image ? [{ url: image, alt: imageAlt }] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const staticSeo = getBlogSeo(slug);
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

  const resolved = resolveBlogPostSeo(slug, post);
  const bodyHtml = prepareWpContentHtml(getWordPressPostBodyHtml(post));
  const title = resolved.h1;
  const isCanonicalSlugRoute =
    !isWordPressPostIdSegment(slug) &&
    typeof post.slug === "string" &&
    post.slug.trim().toLowerCase() === slug.trim().toLowerCase();
  const shouldRenderBlogSeoExtras = Boolean(staticSeo) && isCanonicalSlugRoute;
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const altText =
    post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text?.trim() || title;
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

          {/* Category + draft (dev preview) */}
          <div className="flex flex-wrap items-center gap-2">
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
            {post.status === "draft" && (
              <span
                className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide"
                style={{
                  backgroundColor: "#fde8e8",
                  color: "#8b1a1a",
                }}
              >
                Draft preview
              </span>
            )}
          </div>

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

          {/* Featured image — full banner visible, no crop */}
          {image && (
            <div className="mt-8 w-full rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt={altText}
                width={1200}
                height={500}
                className="h-auto w-full"
                priority
                sizes="(max-width: 1280px) 100vw, 1152px"
              />
            </div>
          )}

          {/* WordPress / Elementor body */}
          {bodyHtml.trim() ? (
            <WpContent html={bodyHtml} />
          ) : (
            <p
              className="mt-10 rounded-xl px-5 py-4 text-sm leading-relaxed"
              style={{
                backgroundColor: "var(--color-surface-container-low)",
                color: "var(--color-on-surface-variant)",
              }}
            >
              Article body is empty in WordPress. In the post editor click <strong>Update</strong> to
              save Elementor content, and ensure the Motherly plugin file on the server is the latest
              version (it sends Elementor HTML to this site).
            </p>
          )}

          {shouldRenderBlogSeoExtras && staticSeo && <BlogSeoExtras seo={staticSeo} />}
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
