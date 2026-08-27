import { stripDuplicateBlogChrome } from "./src/lib/wordpress-content";
import fs from "fs";

const sample = fs.readFileSync("_tmp_prod_wp_body.html", "utf8");
const title = "How Much Walking Is Safe During Pregnancy? Expert Guide";
const featured =
  "https://mothrly.com/wp-content/uploads/2026/04/HOW-MUCH-WALKING-IS-SAFE.jpeg";

const out = stripDuplicateBlogChrome(sample, {
  title,
  featuredImageUrl: featured,
});

fs.writeFileSync("_tmp_stripped_body.html", out, "utf8");

const h2s = [...out.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
  m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 90)
);
const imgs = [...out.matchAll(/<img\b[^>]*>/gi)].length;

console.log("starts with mb-wrap:", out.trimStart().startsWith("<div"));
console.log("has mb-wrap:", out.includes("mb-wrap"));
console.log("img count:", imgs);
console.log("first 5 h2s:");
h2s.slice(0, 5).forEach((h, i) => console.log(`  ${i + 1}. ${h}`));
console.log("\n--- start ---");
console.log(out.slice(0, 700));
