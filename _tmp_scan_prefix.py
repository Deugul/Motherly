import json
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("src/data/local-wp-posts.json", encoding="utf-8") as f:
    data = json.load(f)

posts = data["posts"] if isinstance(data, dict) else data

has_mb = 0
has_prefix_before_mb = 0
has_lead_heading = 0
has_feat_img_early = 0
prefix_examples = []

for p in posts:
    c = p.get("content") or ""
    c_nostyle = re.sub(r"<style[\s\S]*?</style>", "", c, flags=re.I)
    mb = re.search(r'<div[^>]*class="[^"]*\bmb-wrap\b[^"]*"', c_nostyle, re.I)
    if mb:
        has_mb += 1
        prefix = c_nostyle[: mb.start()].strip()
        if prefix:
            has_prefix_before_mb += 1
            if len(prefix_examples) < 15:
                # summarize prefix
                tags = re.findall(r"<([a-z0-9]+)\b", prefix[:1500], re.I)
                plain = re.sub(r"<[^>]*>", " ", prefix)
                plain = re.sub(r"\s+", " ", plain).strip()[:80]
                prefix_examples.append((p["slug"][:45], tags[:12], plain))

    if re.match(r"^(?:\s|<!--[\s\S]*?-->)*<h[12]\b", c_nostyle, re.I):
        has_lead_heading += 1

    featured = p.get("featuredImage") or ""
    base = featured.rsplit("/", 1)[-1].split(".")[0].lower() if featured else ""
    if base and base in c_nostyle[:4000].lower():
        has_feat_img_early += 1

print("total", len(posts))
print("has mb-wrap", has_mb)
print("has content BEFORE mb-wrap", has_prefix_before_mb)
print("starts with h1/h2", has_lead_heading)
print("featured basename in first 4k", has_feat_img_early)
print("\nPrefix examples:")
for e in prefix_examples:
    print("-", e[0])
    print("  tags:", e[1])
    print("  text:", e[2])
