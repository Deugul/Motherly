import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPageClient from "@/components/BlogPageClient";
import { posts as staticPosts, featuredPost } from "@/lib/posts";
import type { BlogPost } from "@/lib/posts";

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

function getFrontmatterValue(fm: string, key: string): string {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  if (!m) return "";
  return m[1].trim().replace(/^'(.*)'$/, "$1").replace(/^"(.*)"$/, "$1");
}

async function getCmsPosts(): Promise<BlogPost[]> {
  try {
    const postsDir = path.join(process.cwd(), "src/content/posts");
    if (!fs.existsSync(postsDir)) return [];

    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdoc"));

    return files
      .map((file) => {
        try {
          const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
          const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
          if (!fmMatch) return null;
          const fm = fmMatch[1];

          const title = getFrontmatterValue(fm, "title");
          const tag = getFrontmatterValue(fm, "tag");
          const tagTheme = getFrontmatterValue(fm, "tagTheme") || "secondary";
          const dateStr = getFrontmatterValue(fm, "date");
          const readTime = getFrontmatterValue(fm, "readTime");
          const coverImage = getFrontmatterValue(fm, "coverImage");

          if (!title) return null;

          return {
            tag: tag.toUpperCase() || "WELLNESS",
            ...(tagThemeMap[tagTheme] ?? tagThemeMap.secondary),
            title,
            excerpt: "",
            image: coverImage,
            date: dateStr
              ? new Date(dateStr).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "",
            readTime: readTime || "5 min read",
          } satisfies BlogPost;
        } catch {
          return null;
        }
      })
      .filter((p): p is BlogPost => p !== null);
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
