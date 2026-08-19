import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Blog Preview",
  robots: { index: false, follow: false },
};

export default function MobileBlogPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-dvh flex flex-col items-center py-6 px-4"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      <p
        className="mb-4 text-center text-xs font-medium tracking-wide uppercase"
        style={{ color: "#888" }}
      >
        Mobile app preview — same data as /api/mobile/blogs
      </p>
      {children}
    </div>
  );
}
