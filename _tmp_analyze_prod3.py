import json
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("_tmp_prod_page.html", encoding="utf-8") as f:
    html = f.read()

non_script = re.sub(r"<script[\s\S]*?</script>", "", html, flags=re.I)
h1 = non_script.find("How Much Walking Is Safe During Pregnancy? Expert Guide")
region = non_script[h1 : h1 + 6000]
clean = re.sub(r"<style[\s\S]*?</style>", "[STYLE]", region, flags=re.I)
clean = re.sub(r"\s+", " ", clean)
clean = re.sub(
    r"<(h[12]|p|img|figure|/figure|div|article|/article|/div|hr)\b",
    r"\n<\1",
    clean,
    flags=re.I,
)
print(clean[:5000])

print("\n\n=== LOCAL DUMP ACROSS POSTS ===")
with open("src/data/local-wp-posts.json", encoding="utf-8") as f:
    data = json.load(f)
posts = data["posts"]

count_title_first = 0
count_featured_in_body = 0
examples = []
for p in posts:
    c = (p.get("content") or "").strip()
    c_nostyle = re.sub(r"<style[\s\S]*?</style>", "", c, flags=re.I)
    m = re.match(
        r"^(?:\s|<!--[\s\S]*?-->)*<(h[12])\b[^>]*>([\s\S]*?)</\1>",
        c_nostyle,
        re.I,
    )
    featured = p.get("featuredImage") or ""
    feat_base = (
        featured.rsplit("/", 1)[-1].split(".")[0].lower() if featured else ""
    )
    if m:
        count_title_first += 1
    if feat_base and feat_base in c_nostyle[:6000].lower():
        count_featured_in_body += 1
        if len(examples) < 12:
            heading = re.sub(r"<[^>]*>", "", m.group(2)) if m else ""
            heading = re.sub(r"\s+", " ", heading).strip()[:70]
            # where is the img relative to start
            img_pos = c_nostyle.lower().find(feat_base)
            examples.append(
                {
                    "slug": p["slug"][:50],
                    "lead_h": bool(m),
                    "heading": heading,
                    "feat_img_pos": img_pos,
                }
            )

print("posts", len(posts))
print("start with h1/h2", count_title_first)
print("featured filename in first 6k of body", count_featured_in_body)
for e in examples:
    print(e)

# Also check: after stripping style, does walking have duplicate consecutive h2?
walking = next(p for p in posts if p["slug"] == "how-much-walking-is-safe-during-pregnancy")
c = walking["content"]
c2 = re.sub(r"<style[\s\S]*?</style>", "", c, flags=re.I)
heads = re.findall(r"<h([12])[^>]*>([\s\S]*?)</h\1>", c2[:8000], re.I)
print("\nWalking early headings:")
for lv, t in heads[:8]:
    plain = re.sub(r"<[^>]*>", "", t)
    plain = re.sub(r"\s+", " ", plain).strip()
    print(f"  H{lv}: {plain[:100]}")

# Find if .mb article inside content has its own h1/h2 + hero
mb = re.search(r'<article[^>]*class="mb"[^>]*>([\s\S]{0,3000})', c2, re.I)
if mb:
    print("\n.mb article start:")
    start = re.sub(r"\s+", " ", mb.group(1))[:1500]
    start = re.sub(r"<(h[12]|p|img|figure|/figure|div|/div)\b", r"\n<\1", start, flags=re.I)
    print(start)
