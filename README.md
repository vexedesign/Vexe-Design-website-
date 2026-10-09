# Vexe Design website

The website for **Vexe Design**: premium, conversion-focused websites. Specialists in garages and service stations, open to every trade and business.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 and Motion. Email delivery uses Resend through a secure server-side route.

---

## 1. Quick start

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command         | What it does                                      |
| --------------- | ------------------------------------------------- |
| `npm run dev`   | Runs the site locally, with live reload           |
| `npm run build` | Builds the production version (run before deploy) |
| `npm run start` | Serves the production build locally               |
| `npm run lint`  | Checks the code for problems                      |

---

## 2. Configuration guide: change almost everything in one file

Open **`site.config.ts`** in the project root. Every value is commented in plain English. Save the file and the site updates.

| What you want to change                 | Where in `site.config.ts`                                        |
| --------------------------------------- | ---------------------------------------------------------------- |
| Business name                           | `businessName`                                                   |
| Tagline (footer, search results)        | `tagline`                                                        |
| **Domain**                              | `const domain = "www.vexedesign.com"` (top of the file)          |
| Email shown on the site                 | `email`                                                          |
| Phone (displayed)                       | `phone`                                                          |
| Phone (tap-to-call link)                | `phoneHref`, e.g. `"tel:+447730424516"`, no spaces               |
| Instagram handle / link                 | `instagram`, `instagramUrl`                                      |
| Copyright year                          | `copyrightYear`                                                  |
| Logo, favicon, hero image, sharing image | `assets` (see section 5)                                        |
| **Colours**                             | `colors`: accent (violet), ink, paper, etc.                      |
| Page titles and Google descriptions     | `seo`                                                            |
| Specialism wording (garages)            | `hero.note`, the first `faq` item, and the Services page intro    |
| Homepage hero headline and buttons      | `hero` (use `\|` in the headline to choose line breaks)          |
| "Not just another website." section     | `positioning`                                                    |
| Process steps                           | `process`                                                        |
| Website-builder comparison              | `why`                                                            |
| **Services**                            | `services` (title, description, benefits, button text)           |
| **Pricing**                             | `pricing.packages` (name, price, description, features, button)  |
| "Most popular" badge                    | `pricing.badge`, and `featured: true` on the package to highlight |
| Pricing disclaimer                      | `pricing.disclaimer`                                             |
| **Portfolio**                           | `portfolio.projects`                                             |
| Instagram tiles                         | `instagramSection.posts`                                         |
| Pricing FAQ                             | `faq`                                                            |
| Navigation links                        | `nav`                                                            |
| Enquiry form dropdowns                  | `form.services`, `form.budgets`, `form.contactMethods`           |

### Changing the specialism

Garages and service stations are named in four places: `hero.note`, the first `faq` answer, the Services page intro (`app/services/page.tsx`) and `audience.singular` (the example site in the hero mock-up). Everything else is written for businesses in general.

### Colours

All colours live in `colors`. They are injected as CSS variables, so the whole site re-themes from that one place. The current values are sampled from the Vexe logo:

| Name           | Value     | Used for                                         |
| -------------- | --------- | ------------------------------------------------ |
| `accent`       | `#5B3DF5` | Buttons, highlights, the featured package        |
| `accentBright` | `#A797FF` | Text and lines on dark backgrounds               |
| `ink`          | `#14151A` | Dark sections, header, footer, body text         |
| `paper`        | `#F5F4F0` | Main page background                             |
| `mist`         | `#DEDCD5` | Borders and dividers                             |

If you change `accent`, keep white text readable on it (aim for a contrast ratio of 4.5:1 or higher).

---

## 3. Email setup: enquiries to contact@vexedesign.com

The enquiry form posts to **`/api/enquiry`** (`app/api/enquiry/route.ts`). That route:

- validates every field again on the server (the browser is never trusted)
- blocks simple spam with a hidden honeypot field and a per-visitor rate limit
- emails the enquiry through [Resend](https://resend.com), with **Reply-To set to the customer**, so you can reply straight from your inbox

**The form does not pretend to work if email isn't set up.** Without the settings below, visitors see a clear message with your email and phone number instead.

### Steps

1. Create a free account at [resend.com](https://resend.com).
2. **Verify your domain:** Resend → *Domains* → *Add domain* → `vexedesign.com`. Add the DNS records Resend shows you at your domain registrar, then wait for "Verified".
3. **Create an API key:** Resend → *API Keys* → *Create* (permission: *Sending access*).
4. Add these **environment variables** (copy `.env.example` to `.env.local` for local testing, and add them in your host's dashboard for the live site):

   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
   CONTACT_EMAIL=contact@vexedesign.com
   CONTACT_FROM_EMAIL=Vexe Design <enquiries@vexedesign.com>
   ```

   | Variable             | Required | Purpose                                                                       |
   | -------------------- | -------- | ----------------------------------------------------------------------------- |
   | `RESEND_API_KEY`     | Yes      | Secret key. Server-only, never sent to the browser.                           |
   | `CONTACT_FROM_EMAIL` | Yes      | Sender address. Must be on your verified domain.                              |
   | `CONTACT_EMAIL`      | No       | Where enquiries arrive. Defaults to `email` in `site.config.ts`.              |

5. Redeploy (or restart `npm run dev`) and send a test enquiry.

> Testing before your domain is verified? Set `CONTACT_FROM_EMAIL="Vexe Design <onboarding@resend.dev>"`. Resend only delivers these test emails to the address you signed up with.

> **Never** put the API key in `site.config.ts` or any file in `components/` or `app/` that runs in the browser. `.env.local` is already excluded from Git.

---

## 4. Deployment guide (Vercel recommended)

Vercel makes Next.js and the free tier covers a site like this.

1. Put the project on GitHub:
   ```bash
   git init
   git add .
   git commit -m "Vexe Design website"
   ```
   Create an empty repository on github.com, then follow its "push an existing repository" commands.
2. Go to [vercel.com](https://vercel.com) → *Add New… → Project* → import the repository. The framework is detected automatically.
3. Before deploying, open *Environment Variables* and add the three variables from section 3.
4. Click **Deploy**. You'll get a `*.vercel.app` address to check everything.

### Connecting your custom domain

1. Set the domain in `site.config.ts` (`const domain = "www.vexedesign.com"`), commit and push. It should match the main address chosen in Vercel; Vercel recommends `www` and redirects the plain domain to it.
2. In Vercel, open the project and click **Domains** in the left-hand menu → **Add Domain** → enter `vexedesign.com`, keep **Redirect apex domains to www** ticked and **Connect to an environment: Production**, then click **Add Domain**.
3. Vercel shows the DNS records to add at your domain registrar. Typically:
   - `A` record for `@` → the IP address Vercel gives you
   - `CNAME` record for `www` → the target Vercel gives you
4. Wait for DNS to update (minutes to a few hours). HTTPS certificates are issued automatically.
5. Submit `https://vexedesign.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

Other hosts (Netlify, Cloudflare, your own server with `npm run build && npm run start`) also work. Set the same environment variables there.

---

## 5. Content guide: images, logo, text

All replaceable files live in **`public/images/`**. Keep the same file names and nothing else needs changing. If you use different names, update the paths in `site.config.ts → assets`.

| File                                  | What it is                                         | Notes                                               |
| ------------------------------------- | -------------------------------------------------- | --------------------------------------------------- |
| `public/images/logo.svg`              | Logo for dark backgrounds (header, footer)         | A vector recreation of your lockup. Replace with your master SVG if you have one. Adjust `assets.logoWidth` if the proportions change. |
| `public/images/logo-dark.svg`         | Logo for light backgrounds                         | Ready for future use                                |
| `public/images/logo-mark.svg`         | The V symbol on its own                            |                                                     |
| `public/favicon.svg`                  | Browser tab icon                                   | Violet tile with the V, from your icon artwork      |
| `public/apple-touch-icon.png`         | Home-screen icon on phones (180 × 180)             |                                                     |
| `public/images/icon-512.png`          | Larger app icon (512 × 512)                        |                                                     |
| `public/images/og.png`                | Link-sharing image (1200 × 630)                    | Regenerate with `node scripts/generate-og.mjs`, or replace it |
| `public/images/hero.jpg` *(optional)* | Hero photo                                         | Add the file, then set `assets.heroImage: "/images/hero.jpg"`. A dark overlay keeps the headline readable. |
| `public/images/brand/`                | Your original brand files, for reference           | Not used on the site                                |
| `public/images/grain.png`             | Subtle texture on dark sections                    | Leave as is                                         |

### Portfolio projects

In `site.config.ts → portfolio.projects`, for each project:

```ts
{ id: "project-01", comingSoon: false, title: "Smith's Garage", category: "Garage website",
  summary: "A faster, mobile-first site built to bring in MOT bookings.",
  image: "/images/portfolio/smiths-garage.jpg", url: "https://example.co.uk" },
```

Put screenshots in `public/images/portfolio/` (4:3 ratio, about 1600 × 1200).

### Instagram

There's no live Instagram connection (Instagram's API requires an approved Meta app). To show posts, save images to `public/images/instagram/` and list them:

```ts
posts: [
  { image: "/images/instagram/post-1.jpg", alt: "Mobile layout for a garage website", url: "https://instagram.com/p/XXXX" },
],
```

Up to six are shown. While the list is empty, the grid shows brand compositions that link to your profile.

### Text that isn't in the config

- Page headers on Services, Pricing and Contact: the top of `app/services/page.tsx`, `app/pricing/page.tsx` and `app/contact/page.tsx`
- "What happens next" steps on Contact: `nextSteps` in `app/contact/page.tsx`
- Legal pages: `app/privacy/page.tsx`, `app/cookies/page.tsx`, `app/terms/page.tsx`. Your company name, number and registered office come from `company` in `site.config.ts` (also shown in the footer, as UK law requires). When you change a legal page, update `LAST_UPDATED` at the top. Each page also has a `DRAFT` switch: setting it to `true` shows a review notice and hides the page from Google (remove it from `app/sitemap.ts` too).

---

## 6. Final audit

### What's implemented

- **Pages:** Home, Services, Pricing, Contact, Privacy, Cookies, Terms, and a custom 404
- **Homepage:** animated hero with a garage-site mock-up (desktop and phone) and pointer parallax; positioning; interactive services index; four-step process with a scroll-linked progress line; pricing preview; comparison with website builders; portfolio; Instagram; final call to action
- **Pricing:** three packages exactly as briefed. Enhanced is elevated, carries the "Most popular" badge and has a violet treatment. Pointer spotlight, disclaimer and FAQ.
- **Enquiry form:** all nine fields, live and on-submit validation with clear messages, error summary, focus moved to the first problem, honeypot, success and failure states, pre-fill from pricing and service buttons (`/contact?package=enhanced`, `/contact?service=…`)
- **Email:** Resend integration on the server, secret key kept in environment variables, rate limiting, Reply-To set to the customer
- **SEO:** per-page titles and descriptions, canonical URLs, Open Graph and X cards, `sitemap.xml`, `robots.txt`, web manifest, structured data (`ProfessionalService` with the three packages as offers), semantic heading order.
- **Accessibility:** skip link, keyboard-friendly navigation, visible focus states, labelled fields with linked error messages, native `<details>` FAQ, mobile menu with Escape support and focus kept inside, reduced-motion support throughout
- **Brand system:** colours sampled from the logo; the V's 17.5° stroke reused as the site's graphic motif (bullets, dividers, oversized hero and CTA marks)

### Testing done

- Production build, TypeScript and ESLint pass with zero warnings
- No console errors across a full navigation journey
- Enquiry form: empty submit, invalid email, valid submit. Server-side validation, honeypot, malformed request and wrong HTTP method all checked. The real Resend API was reached and correctly rejected a dummy key. The success screen was checked with a stubbed response.
- Mobile menu: open, Escape, focus return, close on navigation
- No horizontal scrolling on any page at 320px; layouts checked at 375, 1024, 1280, 1440 and 1920px
- Lighthouse on the production build (local):
  - **Desktop:** Performance 99–100, Accessibility 100, Best Practices 100, SEO 100
  - **Mobile** (simulated slow 4G and a slow phone): Performance 81–91, Accessibility 100, Best Practices 100, SEO 100. The main cost is downloading the display font over throttled 4G. On a real CDN and a normal connection it will be faster.

### Still configurable or placeholder (by design)

- Portfolio: three "Coming soon" cards
- Instagram: brand tiles until you add real posts
- Legal pages: Privacy Policy, Cookie Policy and Terms & Conditions are written to UK law and live. The terms use default business choices (30-day quotes, 50% deposit, 14-day invoices, two revision rounds, 30-day fixes, support scope and response) that you can change in `app/terms/page.tsx`. Add your ICO fee reference to the privacy policy once you have one, and your VAT number to the terms if you register. Consider a quick professional review.
- Logo: a faithful vector recreation from your PNG artwork. Swap in your original SVG when you have it.

### Environment variables

`RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are required for email. `CONTACT_EMAIL` is optional. See `.env.example`.

### Third-party services

- **Resend** for email (has a free tier that comfortably covers enquiry volumes)
- **A host** such as Vercel
- **Google Fonts** (Bricolage Grotesque and Hanken Grotesk), downloaded at build time and served from your own domain, so there are no requests to Google

### Recommended next steps

1. Set up Resend and send yourself a test enquiry on the live site.
2. Add your real logo SVG, if you have the master file.
3. Finish the legal pages (fill in the highlighted items). If you ever add analytics, embeds or a chat widget, update the Cookie Policy and add a consent banner **before** they go live.
4. Replace the portfolio cards as your first projects go live. Real work will do more for conversions than anything else. A testimonials section can be added later once you have genuine client quotes.
5. Create a Google Business Profile and make sure the name, phone and website match this site exactly.
6. Add privacy-friendly analytics (for example Vercel Analytics or Plausible) to see which pages bring enquiries.
