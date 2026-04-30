import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

// ISO date helper
function toISO(d: Date) {
  return d.toISOString().split('T')[0];
}

function url(site: string, path: string, priority: string, changefreq: string, lastmod?: string) {
  return `  <url>
    <loc>${site}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`;
}

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.href ?? 'https://alikatkustomz.com/').replace(/\/$/, '');

  const portfolio = await getCollection('portfolio');
  const services  = await getCollection('services');
  const today     = toISO(new Date());

  const staticPages = [
    url(base, '/',          '1.0', 'weekly',   today),
    url(base, '/portfolio', '0.9', 'weekly',   today),
    url(base, '/services',  '0.9', 'monthly',  today),
    url(base, '/process',   '0.7', 'monthly',  today),
    url(base, '/about',     '0.6', 'monthly',  today),
    url(base, '/contact',   '0.8', 'monthly',  today),
  ];

  const portfolioPages = portfolio.map((e) =>
    url(base, `/portfolio/${e.slug}`, '0.8', 'monthly', toISO(e.data.completed_date))
  );

  const servicePages = services.map((e) =>
    url(base, `/services/${e.slug}`, '0.7', 'monthly', today)
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...portfolioPages, ...servicePages].join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
