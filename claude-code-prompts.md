# Claude Code Prompt Sequence

> **How to use this:** Open Claude Code in your terminal in an empty project folder. Paste these prompts ONE AT A TIME, in order. Wait for each to complete and review the output before moving to the next. Edit bracketed values to match your actual content.

---

## Prompt 1 — Project Setup

```
Initialize a new Astro project for a vintage car custom painting business website. Requirements:

- Astro 4.x with TypeScript strict mode
- Tailwind CSS for styling
- @astrojs/sitemap and @astrojs/image for SEO and image optimization
- Astro content collections with Zod schemas for type-safe portfolio entries
- @astrojs/mdx for rich content pages

Folder structure:
- src/pages/ — routes
- src/layouts/ — Layout.astro (base), PortfolioLayout.astro
- src/components/ — Hero, ServiceCard, PortfolioCard, ProcessStep, Testimonial, ContactForm, SEO, Footer, Nav
- src/content/portfolio/ — markdown entries with frontmatter (year, make, model, services, hero image, gallery, description, color_formula)
- src/content/testimonials/ — markdown entries
- public/images/ — static images
- public/og/ — Open Graph images

Color palette (CSS variables in tailwind config):
- --color-bg: #0F0F10 (near-black)
- --color-surface: #1A1A1C
- --color-text: #E8E6E1 (warm off-white)
- --color-muted: #8A8680
- --color-accent: #B8392E (deep burnt red, like vintage British racing red)
- --color-metal: #9C9893 (brushed steel)

Typography:
- Headings: 'Playfair Display' (serif, vintage feel) — variable weight
- Body: 'Inter' (sans-serif, modern legibility)
- Both via @fontsource for self-hosting

Set up the project, install dependencies, and run a dev server check. Stop here and confirm before building pages.
```

---

## Prompt 2 — Layout, Nav, Footer

```
Build the site shell:

1. src/layouts/Layout.astro — base layout with:
   - SEO component slot (title, description, og image, structured data)
   - Self-hosted Playfair Display + Inter via @fontsource
   - Global CSS resets and custom-property setup
   - Skip-to-content link for accessibility

2. src/components/Nav.astro — sticky top nav with:
   - Logo (text-based for now, "[SHOP NAME]" in Playfair)
   - Links: Services, Portfolio, Process, About, Contact
   - Mobile hamburger that opens a full-screen overlay menu
   - "Request a Quote" button as primary CTA on the right

3. src/components/Footer.astro — three columns:
   - Left: shop name, short tagline
   - Middle: address, phone, email, hours
   - Right: Instagram link, sitemap links
   - Bottom row: copyright, "Built with care."

4. src/components/SEO.astro — accepts props (title, description, image, type) and emits:
   - <title>, meta description
   - Open Graph + Twitter Card tags
   - Canonical URL
   - JSON-LD AutoBodyShop structured data (use placeholders for address, phone)

Use Tailwind exclusively. No inline styles. All components fully accessible (proper ARIA, keyboard nav).
```

---

## Prompt 3 — Homepage

```
Build src/pages/index.astro using the homepage copy from /copy/01-home.md.

Sections:

1. Hero
   - Full-bleed background image (use a placeholder from public/images/hero-placeholder.jpg)
   - Dark overlay gradient (rgba 0,0,0,0.6 at bottom)
   - Eyebrow + headline + subhead + two CTAs
   - Subtle scroll-down indicator

2. Trust bar — 4 stats in a row (small, muted, uppercase tracking)

3. "Three things, done exceptionally well" — three cards in a grid, each with icon, title, body, "Learn more" link

4. Featured work — 6 portfolio cards in a 3x2 grid (2x3 on tablet, 1 column on mobile). Pull from src/content/portfolio/. Each card: hero image, year + make + model, services performed.

5. Process preview — 7 numbered steps in a horizontal timeline (vertical on mobile)

6. "Why owners choose us" — 3 columns

7. Testimonials — 3 cards with photo, name, project, quote. Pull from src/content/testimonials/.

8. About preview — image left, text + CTA right

9. Final CTA section — large headline, body, two buttons

Animation: subtle fade-in on scroll (use Astro's view transitions or a tiny IntersectionObserver script). Keep animations restrained — vintage and serious, not flashy.

Performance: explicit width/height on all images, lazy-load below the fold, use Astro's <Picture> component for responsive images.
```

---

## Prompt 4 — Portfolio System

```
Set up the portfolio system:

1. Define content collection schema in src/content/config.ts:
   - title, slug, year (number), make, model, era (pre-war | 50s | 60s | 70s | 80s+)
   - services (array)
   - hero (image path), gallery (array of image paths with captions)
   - description (markdown body)
   - color_name, color_formula (optional), paint_system
   - duration_months, completed_date
   - featured (boolean)

2. Create src/pages/portfolio/index.astro:
   - Filterable grid by era and make
   - Each card: hero image, year + make + model, services (chips)
   - Filter UI uses URL params so filtered views are shareable

3. Create src/pages/portfolio/[...slug].astro:
   - Hero image full-bleed with project title overlay
   - Two-column layout: left = sticky project metadata (year, make, model, services, color, duration, paint system), right = scrolling description + gallery
   - Gallery: masonry layout, click to open lightbox (use a small accessible lightbox library or build one)
   - Before/after slider component if both images exist
   - "Next project" link at bottom
   - JSON-LD CreativeWork structured data

4. Create 3 example portfolio entries in src/content/portfolio/ as starting templates I can edit later.

Make sure all images use Astro's image optimization, generating AVIF/WebP with JPG fallback.
```

---

## Prompt 5 — Remaining Pages

```
Build the remaining pages using copy from /copy/:

1. src/pages/services/index.astro
   - Hero from copy
   - Services as alternating left/right sections (image + content)
   - Each section: service name, "best for", what's included (list), notes
   - Strong CTA every 2 services

2. src/pages/services/[slug].astro for individual service detail pages (use a content collection)

3. src/pages/process.astro
   - Hero
   - Each of the 7 stages as a full-width section with stage number, title, body
   - Include a placeholder image area for each stage
   - "Ready to start" CTA at bottom

4. src/pages/about.astro
   - Hero
   - Team section (cards)
   - Facility section (image grid + paragraphs)
   - "What we believe" — 3 principles
   - Recognition list

5. src/pages/contact.astro
   - Hero
   - Two-column: form on left, "other ways to reach us" + "what happens next" on right
   - Form configured for Netlify Forms:
     * Add `data-netlify="true"` and `name="quote-request"` to form tag
     * Add `<input type="hidden" name="form-name" value="quote-request" />`
     * Add a honeypot: `<p class="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>`
     * Action: /thank-you/
     * Multi-file upload for photos

6. src/pages/thank-you.astro
   - Confirmation message
   - Expected response time
   - Links back to portfolio and services
```

---

## Prompt 6 — Netlify Configuration & Deployment

```
Final deployment prep:

1. Create netlify.toml:
   [build]
     command = "npm run build"
     publish = "dist"
   [build.environment]
     NODE_VERSION = "20"
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
       Referrer-Policy = "strict-origin-when-cross-origin"
       Permissions-Policy = "geolocation=(), microphone=(), camera=()"
       Strict-Transport-Security = "max-age=31536000; includeSubDomains"
   [[headers]]
     for = "/assets/*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"

2. Create public/robots.txt:
   User-agent: *
   Allow: /
   Sitemap: https://[domain]/sitemap-index.xml

3. Configure @astrojs/sitemap in astro.config.mjs with the production URL.

4. Add a basic 404.astro page.

5. Run final checks:
   - npm run build (must succeed with no warnings)
   - npx astro check (TypeScript)
   - Lighthouse on the built site (aim for 95+ on all metrics)

6. Initialize git, create a .gitignore, and prepare for first commit.

7. Output a step-by-step Netlify deployment instruction list for me to execute manually:
   - Push to GitHub
   - Connect repo in Netlify
   - Set environment variables (none required for this build)
   - Deploy
   - Add custom domain
   - Enable HTTPS
   - Enable Forms in site settings
   - Configure form notifications
```

---

## Prompt 7 — Optional CMS Integration

```
Add Decap CMS so I can edit portfolio entries through a web UI without touching code:

1. Install Decap CMS as a static admin panel at /admin/
2. Configure config.yml for:
   - GitHub backend (for auth via Netlify Identity)
   - Collections matching our content schemas (portfolio, testimonials, services)
   - Image upload to public/images/
3. Add Netlify Identity widget snippet to the layout
4. Document the steps to enable Netlify Identity in the Netlify dashboard

This lets me add new portfolio entries by filling out a web form, which automatically commits to GitHub and triggers a Netlify rebuild.
```

---

## Tips for Working with Claude Code

- **One prompt per session step.** Don't batch — the output is too long to review well.
- **Always review before accepting.** Ask Claude Code to explain any file before it writes it if you're unsure.
- **Commit between prompts.** `git add . && git commit -m "Step 2: layout and nav"` — this gives you a rollback point.
- **Push to GitHub early.** After Prompt 2, push to GitHub. Set up Netlify pointing to the repo immediately so you can see live previews from Prompt 3 onward.
- **Test on mobile constantly.** Open the Netlify preview URL on your phone. This industry skews older but Instagram-driven, and a huge share of traffic is mobile.
