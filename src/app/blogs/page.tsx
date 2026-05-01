import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
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
    const token = process.env.GITHUB_PAT;
    const res = await fetch(
      "https://api.github.com/repos/Deugul/Motherly/contents/src/content/posts",
      {
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];

    const files: { name: string; download_url: string }[] = await res.json();

    const posts = await Promise.all(
      files
        .filter((f) => f.name.endsWith(".mdoc"))
        .map(async (file) => {
          try {
            const raw = await fetch(file.download_url, { next: { revalidate: 60 } }).then((r) =>
              r.text()
            );
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

            const content = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "").trim();
            const firstPara = content.split(/\n\n+/)[0] ?? "";
            const excerpt = firstPara.length > 140 ? firstPara.slice(0, 137) + "…" : firstPara;

            return {
              tag: tag.toUpperCase() || "WELLNESS",
              ...(tagThemeMap[tagTheme] ?? tagThemeMap.secondary),
              title,
              excerpt,
              image: coverImage,
              date: dateStr
                ? new Date(dateStr).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "",
              readTime: readTime || "5 min read",
              content,
            } as BlogPost;
          } catch {
            return null;
          }
        })
    );

    return posts.filter((p): p is BlogPost => p !== null);
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
      <CTASection />
      <Footer />
    </>
  );
}
