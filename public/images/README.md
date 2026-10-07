# Images: what each file is for

Replace a file with your own **using the same name**, and the site picks it up automatically.
To use a different name, change the path in `site.config.ts` → `assets`.

| File               | Purpose                                               | Ideal size / format         |
| ------------------ | ----------------------------------------------------- | --------------------------- |
| `logo.svg`         | Logo on dark backgrounds (header, footer)             | SVG, light artwork          |
| `logo-dark.svg`    | Logo on light backgrounds                             | SVG, dark artwork           |
| `logo-mark.svg`    | The V symbol on its own                               | SVG                         |
| `og.png`           | Image shown when the site is shared on social / chat  | 1200 × 630 PNG or JPG       |
| `icon-512.png`     | App icon (home screen)                                | 512 × 512 PNG               |
| `grain.png`        | Subtle texture on dark sections. Leave as is          | n/a                         |
| `hero.jpg`         | *Optional* hero photo (see `assets.heroImage`)        | 2400 × 1600 JPG, under 400 KB |
| `portfolio/`       | *Create this folder* for project screenshots          | 1600 × 1200 JPG / WebP      |
| `instagram/`       | *Create this folder* for Instagram post images        | 1080 × 1080 JPG / WebP      |
| `brand/`           | Original brand artwork, for reference only            | n/a                         |

The browser-tab icon is `public/favicon.svg`, and the phone home-screen icon is `public/apple-touch-icon.png`.
