import json
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("src/data/local-wp-posts.json", encoding="utf-8") as f:
    data = json.load(f)

posts = data["posts"] if isinstance(data, dict) else data
post = next(p for p in posts if p["slug"] == "how-much-walking-is-safe-during-pregnancy")
content = post["content"]

with open("_tmp_walking_start.html", "w", encoding="utf-8") as out:
    out.write(content[:10000])

print("CONTENT_LEN", len(content))
print("h1", len(re.findall(r"<h1", content, re.I)))
print("h2", len(re.findall(r"<h2", content, re.I)))
print("img", len(re.findall(r"<img", content, re.I)))

parts = re.findall(
    r"<(h[1-6]|img|figure|article|p|div|picture|nav|header)(\b[^>]*)>",
    content[:10000],
    re.I,
)
for i, (tag, attrs) in enumerate(parts[:60]):
    cls = re.search(r'class="([^"]*)"', attrs)
    src = re.search(r'src="([^"]*)"', attrs)
    extra = ""
    if cls:
        extra += " class=" + cls.group(1)[:70]
    if src:
        extra += " src=..." + src.group(1)[-50:]
    print(f"{i:02d} <{tag}>{extra}")

# Also check how many posts start with image/title similar to featured
print("\n=== SAMPLE ACROSS POSTS ===")
sample = posts[:30]
dup_patterns = 0
for p in posts:
    c = p.get("content") or ""
    featured = (p.get("featuredImage") or "").strip()
    starts_with_img = bool(re.match(r"^\s*(?:<!--[\s\S]*?-->\s*)*(?:<figure\b|<div\b[^>]*wp-block-image|<p\b[^>]*>\s*<img\b|<img\b)", c, re.I))
    has_early_h1 = bool(re.search(r"<h1\b", c[:1500], re.I))
    featured_in_content = False
    if featured:
        base = featured.rsplit("/", 1)[-1].rsplit(".", 1)[0]
        featured_in_content = base.lower() in c.lower()[:4000]
    if starts_with_img or has_early_h1 or featured_in_content:
        dup_patterns += 1

print("posts", len(posts))
print("likely_dup_header_or_image", dup_patterns)

# For walking: find heading texts near start
heads = re.findall(r"<h([12])[^>]*>([\s\S]*?)</h\1>", content[:5000], re.I)
for level, text in heads:
    plain = re.sub(r"<[^>]*>", "", text)
    plain = re.sub(r"\s+", " ", plain).strip()
    print(f"H{level}: {plain[:120]}")
