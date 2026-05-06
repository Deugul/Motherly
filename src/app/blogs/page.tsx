import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BlogPageClient from "@/components/BlogPageClient";
import type { BlogPost, FeaturedPost } from "@/lib/posts";

const WP_API = "https://beige-swallow-278886.hostingersite.com/wp-json/wp/v2";

type WpPost = {
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string }>>;
    author?: Array<{ name: string }>;
  };
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

function calcReadTime(excerpt: string): string {
  // Excerpts are ~10% of full article length; scale up for a rough estimate
  const words = stripHtml(excerpt).split(/\s+/).filter(Boolean).length * 10;
  return `${Math.max(3, Math.round(words / 200))} min read`;
}

const TAG_THEME = {
  tagBg: "var(--color-secondary-container)",
  tagColor: "var(--color-on-secondary-container)",
};

async function fetchWpPosts(): Promise<{
  posts: BlogPost[];
  featured: FeaturedPost | null;
  categories: string[];
}> {
  try {
    const res = await fetch(
      `${WP_API}/posts?_embed&per_page=100&orderby=date&order=desc&_fields=id,slug,title,excerpt,date,link,_links,_embedded`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return { posts: [], featured: null, categories: [] };

    const wpPosts: WpPost[] = await res.json();
    if (!Array.isArray(wpPosts) || wpPosts.length === 0) {
      return { posts: [], featured: null, categories: [] };
    }

    const blogPosts: BlogPost[] = wpPosts.map((p) => {
      const image = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";
      const cat = p._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Article";
      const rawExcerpt = stripHtml(p.excerpt?.rendered ?? "");
      const excerpt = rawExcerpt.length > 140 ? rawExcerpt.slice(0, 137) + "…" : rawExcerpt;
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
        link: p.link,
        slug: p.slug,
      };
    });

    const categories = [...new Set(blogPosts.map((p) => p.tag))].sort();

    // First post with an image becomes the featured card
    const featuredWp =
      wpPosts.find((p) => p._embedded?.["wp:featuredmedia"]?.[0]?.source_url) ??
      wpPosts[0];
    const featuredIndex = wpPosts.indexOf(featuredWp);

    const featured: FeaturedPost = {
      tag: (featuredWp._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Article").toUpperCase(),
      title: stripHtml(featuredWp.title?.rendered ?? ""),
      excerpt: stripHtml(featuredWp.excerpt?.rendered ?? "").slice(0, 200),
      image: featuredWp._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
      author: featuredWp._embedded?.author?.[0]?.name ?? "Motherly Team",
      authorRole: "Healthcare Specialist",
      link: featuredWp.link,
      slug: featuredWp.slug,
    };

    // Remove featured post from the grid
    const gridPosts = blogPosts.filter((_, i) => i !== featuredIndex);

    return { posts: gridPosts, featured, categories };
  } catch {
    return { posts: [], featured: null, categories: [] };
  }
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
