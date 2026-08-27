import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("_tmp_prod_page.html", encoding="utf-8") as f:
    html = f.read()

# Find article region
idx = html.find("<article")
print("article idx", idx)

# Extract wp-content div
m = re.search(r'class="wp-content[^"]*"[^>]*>([\s\S]*?)</div>\s*(?:<script|<!--|</article>|<div class="mt-10"|BlogSeo|Keep Reading)', html)
if not m:
    # looser
    m = re.search(r'class="[^"]*wp-content[^"]*"[^>]*>([\s\S]{0,20000})', html)
print("wp-content found", bool(m))
if m:
    body = m.group(1)
    print("body snippet len", len(body))
    with open("_tmp_prod_wp_body.html", "w", encoding="utf-8") as out:
        out.write(body[:15000])

# Count featured image occurrences
feat = "HOW-MUCH-WALKING-IS-SAFE"
print("featured url count", html.lower().count(feat.lower()))

# All h1/h2 near article start
article = html[idx:idx+30000] if idx >= 0 else html[:30000]
heads = re.findall(r"<h([12])([^>]*)>([\s\S]*?)</h\1>", article, re.I)
print("\nHeadings in first 30k of article:")
for level, attrs, text in heads[:15]:
    plain = re.sub(r"<[^>]*>", "", text)
    plain = re.sub(r"\s+", " ", plain).strip()
    print(f"  H{level}: {plain[:140]}")

# Images in article start
imgs = re.findall(r"<img[^>]+>", article[:20000], re.I)
print("\nImages in article start:")
for img in imgs[:10]:
    src = re.search(r'src="([^"]+)"', img)
    alt = re.search(r'alt="([^"]*)"', img)
    print(" ", (src.group(1) if src else "?")[-80:], "| alt=", (alt.group(1) if alt else "")[:60])

# next/image optimized urls
print("\nnext/image walking count", len(re.findall(r"_next/image[^\"']*WALKING", html, re.I)))
print("raw jpeg walking count", len(re.findall(r"HOW-MUCH-WALKING-IS-SAFE[^\"'\s]*", html, re.I)))

# Check for mb-wrap / article.mb structure
print("mb-wrap", "mb-wrap" in html)
print("class=\"mb\"", 'class="mb"' in html or "class='mb'" in html)

# Look for duplicate intro paragraphs
intro = "Pregnancy comes with a flood of advice"
print("intro phrase count", html.count(intro))
intro2 = "Pregnancy comes with a flood of advice from your doctor"
print("intro2 count", html.count("flood of advice"))
