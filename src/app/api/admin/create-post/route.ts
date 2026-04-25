export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, tag, tagTheme, date, readTime, content, coverImageBase64, coverImageName } =
    await req.json();

  if (!title || !tag || !date || !content) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const token = process.env.GITHUB_PAT;
  const owner = "Deugul";
  const repo = "Motherly";

  if (!token) {
    return Response.json({ error: "GITHUB_PAT not configured" }, { status: 500 });
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Upload cover image if provided
  let imagePath = "";
  if (coverImageBase64 && coverImageName) {
    const ext = coverImageName.split(".").pop();
    const imgFileName = `${slug}.${ext}`;
    const imgApiPath = `public/blog/${imgFileName}`;

    const imgRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${imgApiPath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Add blog image: ${imgFileName}`,
          content: coverImageBase64,
        }),
      }
    );

    if (imgRes.ok) {
      imagePath = `/blog/${imgFileName}`;
    }
  }

  // Build MDX file content
  const mdocContent = `---
title: ${title}
coverImage: '${imagePath}'
tag: ${tag}
tagTheme: ${tagTheme}
date: ${date}
readTime: ${readTime}
---

${content}
`;

  const filePath = `src/content/posts/${slug}.mdoc`;
  const fileContent = Buffer.from(mdocContent).toString("base64");

  // Check if file already exists (need its SHA to update)
  let existingSha: string | undefined;
  const checkRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (checkRes.ok) {
    const existing = await checkRes.json();
    existingSha = existing.sha;
  }

  const createRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Add blog post: ${title}`,
        content: fileContent,
        ...(existingSha ? { sha: existingSha } : {}),
      }),
    }
  );

  if (!createRes.ok) {
    const err = await createRes.json();
    return Response.json({ error: err.message ?? "GitHub API error" }, { status: 500 });
  }

  return Response.json({ success: true, slug });
}
