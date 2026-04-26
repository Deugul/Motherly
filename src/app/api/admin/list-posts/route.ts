export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.GITHUB_PAT;
  const owner = "Deugul";
  const repo = "Motherly";

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/src/content/posts`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  );

  if (!res.ok) {
    return Response.json({ posts: [] });
  }

  const files: { name: string; download_url: string }[] = await res.json();
  const mdocFiles = files.filter(f => f.name.endsWith(".mdoc"));

  const posts = await Promise.all(
    mdocFiles.map(async (file) => {
      const slug = file.name.replace(".mdoc", "");
      try {
        const contentRes = await fetch(file.download_url, { cache: "no-store" });
        const raw = await contentRes.text();

        const titleMatch = raw.match(/^title:\s*(.+)$/m);
        const dateMatch = raw.match(/^date:\s*(.+)$/m);
        const tagMatch = raw.match(/^tag:\s*(.+)$/m);
        const imageMatch = raw.match(/^coverImage:\s*'?([^'\n]+)'?$/m);

        return {
          slug,
          title: titleMatch?.[1]?.trim() ?? slug,
          date: dateMatch?.[1]?.trim() ?? "",
          tag: tagMatch?.[1]?.trim() ?? "",
          coverImage: imageMatch?.[1]?.trim() ?? "",
        };
      } catch {
        return { slug, title: slug, date: "", tag: "", coverImage: "" };
      }
    })
  );

  posts.sort((a, b) => (b.date > a.date ? 1 : -1));

  return Response.json({ posts });
}
