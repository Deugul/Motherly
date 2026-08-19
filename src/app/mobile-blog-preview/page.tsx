import Image from "next/image";
import Link from "next/link";
import { listMobileBlogPosts } from "@/lib/mobile-blog-api";

export default async function MobileBlogPreviewPage() {
  const { posts, total } = await listMobileBlogPosts({ page: 1, perPage: 20 });

  return (
    <div
      className="w-full max-w-[390px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Status bar mock */}
      <div
        className="px-5 pt-3 pb-2 flex items-center justify-between text-[11px] font-semibold"
        style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
      >
        <span>9:41</span>
        <span className="font-bold tracking-tight" style={{ color: "var(--color-primary)" }}>
          Motherly
        </span>
        <span>Blogs</span>
      </div>

      <div className="px-4 py-4">
        <h1
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: "var(--font-plus-jakarta)", color: "var(--color-on-background)" }}
        >
          Blogs
        </h1>
        <p className="text-sm mb-5" style={{ color: "var(--color-on-surface-variant)" }}>
          {total} articles · API preview
        </p>

        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/mobile-blog-preview/${post.slug}`}
              className="block rounded-2xl overflow-hidden no-underline"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                boxShadow: "0 2px 12px rgba(45,52,53,0.08)",
              }}
            >
              {post.featuredImage ? (
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="390px"
                  />
                </div>
              ) : null}
              <div className="p-4">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--color-primary)" }}
                >
                  {post.category}
                </span>
                <h2
                  className="text-base font-bold mt-1 mb-2 line-clamp-2"
                  style={{ fontFamily: "var(--font-plus-jakarta)", color: "var(--color-on-background)" }}
                >
                  {post.title}
                </h2>
                <p
                  className="text-sm line-clamp-2 mb-3"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {post.excerpt}
                </p>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                  {post.dateFormatted} · {post.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
