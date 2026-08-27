import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("_tmp_prod_page.html", encoding="utf-8") as f:
    html = f.read()

# Find all occurrences of page H1 text
h1_text = "How Much Walking Is Safe During Pregnancy? Expert Guide"
print("H1 text count:", html.count(h1_text))

# Find all "Back to Blogs"
print("Back to Blogs:", html.count("Back to Blogs"))

# Find wp-content class occurrences
print("wp-content class:", len(re.findall(r"wp-content", html)))

# Find article.mb
print("article class=mb:", len(re.findall(r"<article[^>]*class=\"mb\"", html)))
print("mb-wrap:", html.count("mb-wrap"))

# Extract the main article region more carefully from RSC payload vs HTML
# Look for the visible HTML structure around featured image and content

# Find Next.js Image for featured
for m in re.finditer(r"<img[^>]+HOW-MUCH-WALKING[^>]+>", html, re.I):
    tag = m.group(0)
    # skip tiny
    if "1600" in tag or "1200" in tag or "w-" in tag or "priority" in tag or "sizes=" in tag:
        print("\nIMG TAG @", m.start())
        print(tag[:300])

print("\n--- Searching RSC / escaped content ---")
# In Next.js the content may appear in both HTML and flight data
# Count in non-script vs script
scripts = "".join(re.findall(r"<script[\s\S]*?</script>", html, re.I))
non_script = re.sub(r"<script[\s\S]*?</script>", "", html, flags=re.I)
print("intro in scripts:", scripts.count("flood of advice"))
print("intro in non-script:", non_script.count("flood of advice"))
print("featured in scripts:", scripts.lower().count("how-much-walking-is-safe"))
print("featured in non-script:", non_script.lower().count("how-much-walking-is-safe"))

# Show structure around first featured image in non-script
idx = non_script.lower().find("how-much-walking-is-safe")
print("\nContext around first featured in non-script (idx", idx, "):")
snippet = non_script[max(0, idx - 500) : idx + 800]
# collapse whitespace for readability
snippet = re.sub(r"\s+", " ", snippet)
print(snippet[:1200])

# Find all h1 and h2 in non-script near article
print("\n--- Headings non-script ---")
for m in re.finditer(r"<h([12])[^>]*>([\s\S]*?)</h\1>", non_script, re.I):
    plain = re.sub(r"<[^>]*>", "", m.group(2))
    plain = re.sub(r"\s+", " ", plain).strip()
    if "walk" in plain.lower() or "pregnan" in plain.lower() or m.start() < 50000:
        if "walk" in plain.lower() or m.start() < 40000:
            print(f"@{m.start()} H{m.group(1)}: {plain[:120]}")
