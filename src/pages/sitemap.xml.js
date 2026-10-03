import { productionUrl } from '../data/site.js';
import { getMembers } from '../lib/comunidade';

export async function GET() {
  const origin = import.meta.env.SITE || productionUrl;
  const members = await getMembers();
  const pages = ['/', '/comunidade/', ...members.map((m) => `/comunidade/${m.slug}/`)];
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
