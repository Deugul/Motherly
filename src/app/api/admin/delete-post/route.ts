export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, imagePath } = await req.json();
  if (!slug) {
    return Response.json({ error: "Missing slug" }, { status: 400 });
  }

  const token = process.env.GITHUB_PAT;
  const owner = "Deugul";
  const repo = "Motherly";

  if (!token) {
    return Response.json({ error: "GITHUB_PAT not configured" }, { status: 500 });
  }

  const filePath = `src/content/posts/${slug}.mdoc`;

  // Get file SHA (required by GitHub to delete)
  const getRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!getRes.ok) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  const { sha } = await getRes.json();

  const delRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ message: `Delete blog post: ${slug}`, sha }),
    }
  );

  if (!delRes.ok) {
    const err = await delRes.json();
    return Response.json({ error: err.message ?? "GitHub API error" }, { status: 500 });
  }

  // Also delete the cover image if it's in /public/blog/
  if (imagePath && imagePath.startsWith("/blog/")) {
    const imgFilePath = `public${imagePath}`;
    const imgGetRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${imgFilePath}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (imgGetRes.ok) {
      const { sha: imgSha } = await imgGetRes.json();
      await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${imgFilePath}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ message: `Delete blog image: ${imagePath}`, sha: imgSha }),
        }
      );
    }
  }

  // Trigger Vercel redeploy
  const deployHook = process.env.VERCEL_DEPLOY_HOOK;
  if (deployHook) {
    await fetch(deployHook, { method: "POST" });
  }

  return Response.json({ success: true });
}
