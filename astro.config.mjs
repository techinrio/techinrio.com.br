// @ts-check
import { defineConfig } from 'astro/config';
import { productionUrl } from './src/data/site.js';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? productionUrl,
});
