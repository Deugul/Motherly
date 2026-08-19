import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMobileBlogPost } from "@/lib/mobile-blog-api";

type Props = { params: Promise<{ slug: string }> };

export default async function MobileBlogPreviewDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getMobileBlogPost(slug);

  if (!post) notFound();

  return (
    <div
      className="w-full max-w-[390px] rounded-[2rem] shadow-2xl border border-white/10"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div
        className="px-4 py-3 flex items-center gap-3 sticky top-0 z-10 border-b border-black/5"
        style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
      >
        <Link
          href="/mobile-blog-preview"
          className="text-sm font-semibold no-underline shrink-0"
          style={{ color: "var(--color-primary)" }}
        >
          ← Back
        </Link>
        <span
          className="text-sm font-bold truncate"
          style={{ fontFamily: "var(--font-plus-jakarta)", color: "var(--color-on-background)" }}
        >
          Article
        </span>
      </div>

      <article className="pb-8">
        {post.featuredImage ? (
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="390px"
              priority
            />
          </div>
        ) : null}

        <div className="px-4 pt-5">
          <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "var(--color-primary)" }}
          >
            {post.category}
          </span>
          <h1
            className="text-xl font-bold mt-2 mb-3 leading-snug"
            style={{ fontFamily: "var(--font-plus-jakarta)", color: "var(--color-on-background)" }}
          >
            {post.title}
          </h1>
          <p className="text-xs mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
            {post.dateFormatted} · {post.author}
          </p>

          {/* Same HTML the mobile app gets in contentHtml */}
          <div
            className="wp-content w-full text-[15px] leading-relaxed"
            style={{ color: "var(--color-on-background)" }}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>

        {post.related.length > 0 ? (
          <div className="px-4 mt-8 pt-6 border-t border-black/5">
            <h2
              className="text-sm font-bold mb-4 uppercase tracking-wide"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Related
            </h2>
            <div className="flex flex-col gap-3">
              {post.related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/mobile-blog-preview/${r.slug}`}
                  className="flex gap-3 no-underline rounded-xl p-2"
                  style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
                >
                  {r.featuredImage ? (
                    <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                      <Image src={r.featuredImage} alt={r.title} fill className="object-cover" sizes="80px" />
                    </div>
                  ) : null}
                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold line-clamp-2"
                      style={{ color: "var(--color-on-background)" }}
                    >
                      {r.title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
                      {r.dateFormatted}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </div>
  );
}
