import { productionUrl } from '../data/site.js';
import { getGallery } from '../lib/gallery';

export function GET() {
  const origin = import.meta.env.SITE || productionUrl;
  // The community page is paused and stays out of the sitemap.
  const pages = ['/', '/galeria/', ...getGallery().map((e) => `/galeria/${e.slug}/`)];
  const urls = pages
    .map((path) => {
      const loc = new URL(path, origin).href;
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
