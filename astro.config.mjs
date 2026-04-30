// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// Sitemap is generated as a static endpoint (src/pages/sitemap.xml.ts)
// instead of via @astrojs/sitemap, which has Astro 4 compatibility issues.

export default defineConfig({
  site: 'https://alikatkustomz.com', // TODO: replace with real domain before launch
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
  image: {
    domains: [],
  },
});
