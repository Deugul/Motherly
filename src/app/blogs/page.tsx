import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BlogPageClient from "@/components/BlogPageClient";
import type { BlogPost, FeaturedPost } from "@/lib/posts";
import { resolvePostCardExcerpt } from "@/lib/wordpress-seo";
import type { RankMathSeoFromWp } from "@/lib/wordpress-seo";
import { fetchWordPress } from "@/lib/wordpress";
import { resolveFeaturedImageUrl } from "@/lib/wordpress-featured-image";
import { getBlogImageProps } from "@/lib/blog-image-manifest";
import { listLocalWpPosts } from "@/lib/local-wp-posts";

type WpPost = {
  id?: number;
  status?: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  featured_media?: number;
  motherly_featured_image_url?: string | null;
  rank_math_seo?: RankMathSeoFromWp | null;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; code?: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string }>>;
    author?: Array<{ name: string }>;
  };
};

function stripHtml(html: string): string {
  return html
    // Exported posts are full HTML documents — drop non-text regions entirely,
    // or CSS and script bodies survive into excerpts.
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

function calcReadTime(excerpt: string): string {
  // Excerpts are ~10% of full article length; scale up for a rough estimate
  const words = stripHtml(excerpt).split(/\s+/).filter(Boolean).length * 10;
  return `${Math.max(3, Math.round(words / 200))} min read`;
}

const TAG_THEME = {
  tagBg: "var(--color-secondary-container)",
  tagColor: "var(--color-on-secondary-container)",
};

function mapWpPostsToBlogData(wpPosts: WpPost[]): {
  posts: BlogPost[];
  featured: FeaturedPost | null;
  categories: string[];
} {
  if (!wpPosts.length) {
    return { posts: [], featured: null, categories: [] };
  }

  const blogPosts: BlogPost[] = wpPosts.map((p) => {
    const rawImage =
      p.motherly_featured_image_url?.trim() ||
      p._embedded?.["wp:featuredmedia"]?.[0]?.source_url?.trim() ||
      "";
    // Recovered local copy when available; branded artwork when the original
    // is still on the retired WordPress origin (which would render broken).
    const image =
      getBlogImageProps(rawImage, "", { width: 1200, height: 500, seed: p.slug ?? "" })
        ?.src ?? rawImage;
    const cat = p._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Article";
    const excerpt = resolvePostCardExcerpt(p, 140);
    const date = new Date(p.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return {
      tag: cat.toUpperCase(),
      ...TAG_THEME,
      title: stripHtml(p.title?.rendered ?? ""),
      excerpt,
      image,
      date,
      readTime: calcReadTime(p.excerpt?.rendered ?? ""),
      link: p.status === "draft" ? undefined : p.link,
      slug: p.slug?.trim() || (p.id ? String(p.id) : undefined),
      status: p.status,
      wpId: p.id,
    };
  });

  const categories = [...new Set(blogPosts.map((p) => p.tag))].sort();

  let featuredImageIndex = blogPosts.findIndex(
    (p, i) => wpPosts[i].status !== "draft" && Boolean(p.image)
  );
  if (featuredImageIndex < 0) {
    const publishedIndex = wpPosts.findIndex((p) => p.status !== "draft");
    featuredImageIndex =
      publishedIndex >= 0 ? publishedIndex : blogPosts.findIndex((p) => p.image);
  }
  if (featuredImageIndex < 0) featuredImageIndex = 0;

  const featuredWp = wpPosts[featuredImageIndex];
  const featuredCard = blogPosts[featuredImageIndex];

  const featured: FeaturedPost = {
    tag: (featuredWp._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Article").toUpperCase(),
    title: stripHtml(featuredWp.title?.rendered ?? ""),
    excerpt: resolvePostCardExcerpt(featuredWp, 200),
    image: featuredCard.image,
    author: featuredWp._embedded?.author?.[0]?.name ?? "Motherly Team",
    authorRole: "Healthcare Specialist",
    link: featuredWp.status === "draft" ? undefined : featuredWp.link,
    slug: featuredWp.slug?.trim() || (featuredWp.id ? String(featuredWp.id) : undefined),
    status: featuredWp.status,
  };

  const gridPosts = blogPosts.filter((_, i) => i !== featuredImageIndex);
  return { posts: gridPosts, featured, categories };
}

async function fetchWpPosts(): Promise<{
  posts: BlogPost[];
  featured: FeaturedPost | null;
  categories: string[];
}> {
  try {
    const params = new URLSearchParams({
      _embed: "",
      per_page: "100",
      orderby: "date",
      order: "desc",
      _fields:
        "id,slug,title,excerpt,date,link,status,featured_media,motherly_featured_image_url,rank_math_seo,_links,_embedded",
    });

    const { data: remotePosts, ok } = await fetchWordPress<WpPost[]>("/posts", params);
    if (ok && Array.isArray(remotePosts) && remotePosts.length > 0) {
      const resolvedImages = await Promise.all(
        remotePosts.map((p) => resolveFeaturedImageUrl(p))
      );
      const withImages = remotePosts.map((p, index) => ({
        ...p,
        motherly_featured_image_url:
          p.motherly_featured_image_url?.trim() || resolvedImages[index] || null,
      }));
      return mapWpPostsToBlogData(withImages);
    }
  } catch {
    // fall through to local dump
  }

  return mapWpPostsToBlogData(listLocalWpPosts() as WpPost[]);
}

export default async function BlogsPage() {
  const { posts: wpPosts, featured, categories } = await fetchWpPosts();

  return (
    <>
      <Navbar />
      <main
        className="pt-32 pb-20 max-w-7xl mx-auto px-6"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <BlogPageClient posts={wpPosts} featuredPost={featured} categories={categories} />
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
