"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const TAG_OPTIONS = ["Prenatal", "Newborn Care", "Wellness", "Postpartum"];
const TAG_THEME_OPTIONS = [
  { label: "Pink (Primary)", value: "primary" },
  { label: "Purple (Secondary)", value: "secondary" },
  { label: "Teal (Tertiary)", value: "tertiary" },
];

interface PublishedPost {
  slug: string;
  title: string;
  date: string;
  tag: string;
  coverImage: string;
}

export default function BlogAdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [form, setForm] = useState({
    title: "",
    tag: "Wellness",
    tagTheme: "secondary",
    date: new Date().toISOString().split("T")[0],
    readTime: "5 min read",
    content: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState<PublishedPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadPosts = useCallback(async (pwd: string) => {
    setLoadingPosts(true);
    try {
      const res = await fetch("/api/admin/list-posts", {
        headers: { "x-admin-password": pwd },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts ?? []);
      }
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    if (authed) loadPosts(password);
  }, [authed, password, loadPosts]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    let coverImageBase64 = "";
    let coverImageName = "";
    if (imageFile) {
      coverImageBase64 = await toBase64(imageFile);
      coverImageName = imageFile.name;
    }

    const res = await fetch("/api/admin/create-post", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ ...form, coverImageBase64, coverImageName }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("success");
      setMessage(`Post "${form.title}" published! It will appear on the site in ~1 minute.`);
      setForm({ title: "", tag: "Wellness", tagTheme: "secondary", date: new Date().toISOString().split("T")[0], readTime: "5 min read", content: "" });
      setImageFile(null);
      setImagePreview("");
      if (fileRef.current) fileRef.current.value = "";
      loadPosts(password);
    } else {
      setStatus("error");
      setMessage(data.error ?? "Something went wrong.");
    }
  };

  const handleDelete = async (post: PublishedPost) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeletingSlug(post.slug);
    const res = await fetch("/api/admin/delete-post", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ slug: post.slug, imagePath: post.coverImage }),
    });
    setDeletingSlug(null);
    if (res.ok) {
      setPosts(p => p.filter(x => x.slug !== post.slug));
    } else {
      const data = await res.json();
      alert(data.error ?? "Delete failed.");
    }
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-background)" }}>
        <div style={{ width: 360, padding: 32, borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", backgroundColor: "white" }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: "var(--color-on-surface)" }}>Blog Admin</h1>
          <p style={{ fontSize: 14, color: "var(--color-on-surface-variant)", marginBottom: 24 }}>Enter your admin password to continue.</p>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") setAuthed(true); }}
            style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #ddd", fontSize: 15, marginBottom: 12, boxSizing: "border-box" }}
          />
          <button
            onClick={() => setAuthed(true)}
            style={{ width: "100%", padding: "10px 0", borderRadius: 8, border: "none", backgroundColor: "var(--color-primary)", color: "white", fontWeight: 600, fontSize: 15, cursor: "pointer" }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-background)", padding: "40px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>

        {/* Create form */}
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4, color: "var(--color-on-surface)" }}>New Blog Post</h1>
          <p style={{ fontSize: 14, color: "var(--color-on-surface-variant)", marginBottom: 32 }}>
            Posts are saved to GitHub and appear on the site in ~1 minute.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Field label="Title *">
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. What to Expect in Your Third Trimester" style={inputStyle} />
            </Field>

            <Field label="Cover Image">
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} style={{ fontSize: 14 }} />
              {imagePreview && <img src={imagePreview} alt="preview" style={{ marginTop: 10, maxHeight: 180, borderRadius: 8, objectFit: "cover" }} />}
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Tag / Category">
                <select value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} style={inputStyle}>
                  {TAG_OPTIONS.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Tag Colour">
                <select value={form.tagTheme} onChange={e => setForm(f => ({ ...f, tagTheme: e.target.value }))} style={inputStyle}>
                  {TAG_THEME_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </Field>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Publish Date *">
                <input required type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} />
              </Field>
              <Field label="Read Time *">
                <input required value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))} placeholder="5 min read" style={inputStyle} />
              </Field>
            </div>

            <Field label="Article Content *">
              <textarea
                required
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                placeholder="Write your blog post content here..."
                rows={14}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
              />
            </Field>

            {message && (
              <div style={{ padding: "12px 16px", borderRadius: 8, backgroundColor: status === "success" ? "#f0fdf4" : "#fef2f2", color: status === "success" ? "#166534" : "#991b1b", fontSize: 14 }}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              style={{ padding: "12px 0", borderRadius: 8, border: "none", backgroundColor: "var(--color-primary)", color: "white", fontWeight: 600, fontSize: 16, cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.7 : 1 }}
            >
              {status === "loading" ? "Publishing…" : "Publish Post"}
            </button>
          </form>
        </div>

        {/* Published posts list */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: "var(--color-on-surface)" }}>Published Posts</h2>
          {loadingPosts ? (
            <p style={{ fontSize: 14, color: "var(--color-on-surface-variant)" }}>Loading…</p>
          ) : posts.length === 0 ? (
            <p style={{ fontSize: 14, color: "var(--color-on-surface-variant)" }}>No posts yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {posts.map(post => (
                <div key={post.slug} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 10, backgroundColor: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  {post.coverImage && (
                    <img src={post.coverImage} alt="" style={{ width: 64, height: 48, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: 15, color: "var(--color-on-surface)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.title}</p>
                    <p style={{ fontSize: 12, color: "var(--color-on-surface-variant)", margin: "2px 0 0" }}>{post.tag} · {post.date}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(post)}
                    disabled={deletingSlug === post.slug}
                    style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid #fca5a5", backgroundColor: deletingSlug === post.slug ? "#fef2f2" : "white", color: "#dc2626", fontSize: 13, fontWeight: 600, cursor: deletingSlug === post.slug ? "not-allowed" : "pointer", flexShrink: 0 }}
                  >
                    {deletingSlug === post.slug ? "Deleting…" : "Delete"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-on-surface-variant)" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #ddd",
  fontSize: 15,
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: "white",
};
