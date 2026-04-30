/**
 * Content collection schemas for Ali Kat Kustomz.
 *
 * ── IMAGE OPTIMISATION UPGRADE PATH ────────────────────────────────────────
 * Currently images are stored in /public and referenced as string paths.
 * When you add real JPEG/PNG photos, move them to src/assets/portfolio/ and
 * change the two schema sections marked [UPGRADE] like this:
 *
 *   // 1. Switch schema() to a function that receives the image() helper:
 *   schema: ({ image }) => z.object({
 *     hero:   image(),
 *     before: image().optional(),
 *     gallery: z.array(z.object({ src: image(), caption: z.string().optional() })).optional(),
 *     ...rest unchanged...
 *   }),
 *
 *   // 2. In frontmatter, change paths from /images/… to relative:
 *   //    hero: ../../assets/portfolio/my-car-hero.jpg
 *
 *   // 3. In components, swap <img> for <Picture>:
 *   //    import { Picture } from 'astro:assets';
 *   //    <Picture src={hero} widths={[400,800,1200]} formats={['avif','webp']} alt="…" />
 * ───────────────────────────────────────────────────────────────────────────
 */

import { defineCollection, z } from 'astro:content';

// ── Shared ────────────────────────────────────────────────────────────────

export const ERA_VALUES = ['pre-war', '50s', '60s', '70s', '80s+'] as const;
export type Era = (typeof ERA_VALUES)[number];

// ── Portfolio ─────────────────────────────────────────────────────────────

const portfolio = defineCollection({
  type: 'content',
  // [UPGRADE] Change to: schema: ({ image }) => z.object({ ... })
  schema: z.object({

    /** Display title (falls back to "{year} {make} {model}" when omitted) */
    title: z.string().optional(),

    // ── Vehicle identity ──────────────────────────────────────────────────
    year:  z.number().int().min(1886).max(2099),
    make:  z.string(),
    model: z.string(),

    /**
     * Decade era for filtering.
     * Values: 'pre-war' | '50s' | '60s' | '70s' | '80s+'
     */
    era: z.enum(ERA_VALUES),

    // ── Work performed ────────────────────────────────────────────────────
    services: z.array(z.string()),

    // ── Images (string paths relative to /public) ─────────────────────────
    // [UPGRADE] Replace the three lines below with image() calls (see header).

    /** Hero / cover image path, e.g. /images/portfolio/etype/hero.jpg */
    hero: z.string(),

    /**
     * "Before" image for the before/after comparison slider.
     * When absent, the slider is hidden.
     */
    before: z.string().optional(),

    /**
     * Gallery images with optional captions.
     * Example entry: { src: '/images/portfolio/etype/1.jpg', caption: 'Front three-quarter' }
     */
    gallery: z
      .array(
        z.object({
          src: z.string(),
          caption: z.string().optional(),
        })
      )
      .optional(),

    // ── Copy ──────────────────────────────────────────────────────────────

    /** Short teaser shown on the card and in the page description meta tag */
    description: z.string(),

    // ── Paint spec ───────────────────────────────────────────────────────

    /** Colloquial colour name, e.g. "British Racing Green — Deep Formula" */
    color_name: z.string().optional(),

    /**
     * Lab-grade mixing formula for internal records.
     * e.g. "PPG DBU 4500 base + 0.5 % Carbon Black Pearl"
     */
    color_formula: z.string().optional(),

    /**
     * Paint product system used.
     * e.g. "PPG Deltron 2000", "Standox Standohyd WB", "BASF Glasurit 90-Line"
     */
    paint_system: z.string().optional(),

    // ── Project metadata ─────────────────────────────────────────────────

    /** Calendar months from intake to handover */
    duration_months: z.number().int().min(1).optional(),

    /** ISO date string of the handover / completion date */
    completed_date: z.string().transform((s) => new Date(s)),

    /** Pin to the homepage "Featured Work" section */
    featured: z.boolean().default(false),
  }),
});

// ── Testimonials ──────────────────────────────────────────────────────────

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    author:   z.string(),
    /** Customer's vehicle, e.g. "1965 Aston Martin DB5" */
    vehicle:  z.string().optional(),
    /** Optional path to a portrait photo (relative to /public) */
    photo:    z.string().optional(),
    /** Star rating 1–5 */
    rating:   z.number().int().min(1).max(5).default(5),
    date:     z.string().transform((s) => new Date(s)),
    featured: z.boolean().default(false),
  }),
});

// ── Services ──────────────────────────────────────────────────────────────

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().int().min(1),
    tagline: z.string(),
    hero: z.string().optional(),
    included: z.array(z.string()),
    timeline: z.string().optional(),
    starts_at: z.string().optional(),
    note: z.string().optional(),
  }),
});

export const collections = { portfolio, testimonials, services };
