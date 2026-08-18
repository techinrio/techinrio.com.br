// @ts-check
import { defineConfig } from 'astro/config';
import { productionUrl } from './src/data/site.js';

function resolveSite() {
  if (process.env.PUBLIC_SITE_URL) {
    return process.env.PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_ENV === 'production') {
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }

    return productionUrl;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return productionUrl;
}

// https://astro.build/config
export default defineConfig({
  site: resolveSite(),
});
