import Navbar from "@/components/Navbar";

function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-xl ${className ?? ""}`}
      style={{ backgroundColor: "var(--color-surface-container-high)", ...style }}
    />
  );
}

export default function BlogPostLoading() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20" style={{ backgroundColor: "var(--color-background)" }}>
        <article className="max-w-7xl mx-auto px-6">
          {/* Back */}
          <Skeleton style={{ width: "100px", height: "16px", marginBottom: "32px" }} />

          {/* Category */}
          <Skeleton style={{ width: "80px", height: "12px", marginBottom: "12px" }} />

          {/* Title */}
          <div className="space-y-3 mt-3">
            <Skeleton style={{ height: "40px", width: "85%" }} />
            <Skeleton style={{ height: "40px", width: "60%" }} />
          </div>

          {/* Meta */}
          <div className="flex gap-4 mt-5">
            <Skeleton style={{ width: "100px", height: "14px" }} />
            <Skeleton style={{ width: "80px", height: "14px" }} />
          </div>

          {/* Featured image */}
          <Skeleton style={{ height: "480px", maxHeight: "55vh", marginTop: "32px", borderRadius: "16px" }} />

          {/* Content lines */}
          <div className="mt-10 space-y-4">
            {[100, 95, 88, 100, 72, 90, 100, 80, 65].map((w, i) => (
              <Skeleton key={i} style={{ height: "16px", width: `${w}%` }} />
            ))}
            <div className="pt-4 space-y-4">
              {[100, 92, 85, 100, 70].map((w, i) => (
                <Skeleton key={i} style={{ height: "16px", width: `${w}%` }} />
              ))}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
