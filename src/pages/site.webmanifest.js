import { site } from '../data/site.js';

export function GET() {
  const body = {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    scope: '/',
    display: 'browser',
    background_color: site.themeColor,
    theme_color: site.themeColor,
    lang: site.language,
    icons: [
      {
        src: site.favicon,
        sizes: '1000x1000',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };

  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
    },
  });
}
