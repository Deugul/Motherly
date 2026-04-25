import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPageClient from "@/components/BlogPageClient";
import { posts as staticPosts, featuredPost } from "@/lib/posts";
import type { BlogPost } from "@/lib/posts";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";

const tagThemeMap: Record<string, { tagBg: string; tagColor: string }> = {
  primary: {
    tagBg: "var(--color-primary-container)",
    tagColor: "var(--color-on-primary-container)",
  },
  secondary: {
    tagBg: "var(--color-secondary-container)",
    tagColor: "var(--color-on-secondary-container)",
  },
  tertiary: {
    tagBg: "var(--color-tertiary-container)",
    tagColor: "var(--color-on-tertiary-container)",
  },
};

async function getCmsPosts(): Promise<BlogPost[]> {
  try {
    const reader = createReader(process.cwd(), keystaticConfig);
    const slugs = await reader.collections.posts.list();
    const results = await Promise.all(
      slugs.map((slug) => reader.collections.posts.read(slug))
    );
    return results
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .map((p) => ({
        tag: p.tag.toUpperCase(),
        ...(tagThemeMap[p.tagTheme] ?? tagThemeMap.secondary),
        title: p.title,
        excerpt: p.excerpt,
        image: p.coverImage ?? "",
        date: p.date
          ? new Date(p.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
        readTime: p.readTime,
      }));
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const cmsPosts = await getCmsPosts();
  const allPosts: BlogPost[] = [...cmsPosts, ...staticPosts];

  return (
    <>
      <Navbar />
      <main
        className="pt-32 pb-20 max-w-7xl mx-auto px-6"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <BlogPageClient posts={allPosts} featuredPost={featuredPost} />
      </main>
      <Footer />
    </>
  );
}
