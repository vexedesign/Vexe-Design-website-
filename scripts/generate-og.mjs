// Generates public/images/og.png (the image shown when the site is shared on
// WhatsApp, LinkedIn, Facebook, X etc.) from the logo and brand colours.
//   Run with:  node scripts/generate-og.mjs
// Or simply replace public/images/og.png with your own 1200 × 630 image.
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const INK = "#14151A";
const PAPER = "#F5F4F0";
const VIOLET = "#5B3DF5";

// Reuse the logo artwork (everything inside the <svg> element).
const logo = fs.readFileSync(root("public/images/logo.svg"), "utf8");
const logoInner = logo.replace(/<!--[\s\S]*?-->/g, "").replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");

const lines = ["We build websites", "that move businesses", "forward."];

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${VIOLET}" stop-opacity="0.95"/>
      <stop offset="1" stop-color="${VIOLET}" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${INK}"/>
  <g transform="translate(640 -40) scale(3.6)">
    <path d="M0 0H52.5L110 182H65.5Z" fill="#fff" fill-opacity="0.05"/>
    <path d="M157 0H210L153 182H110Z" fill="url(#v)"/>
  </g>
  <g transform="translate(80 70) scale(0.36)">${logoInner}</g>
  ${lines
    .map(
      (l, i) =>
        `<text x="76" y="${318 + i * 88}" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-weight="700" font-size="84" letter-spacing="-2.5" fill="${PAPER}">${l}</text>`,
    )
    .join("")}
  <text x="80" y="590" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#A3A3AA">Premium websites for ambitious businesses</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(root("public/images/og.png"));
console.log("Created public/images/og.png");
