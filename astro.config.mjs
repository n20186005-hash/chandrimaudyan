import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const configuredSite = (process.env.PUBLIC_SITE_URL || 'https://chandrimaudyan.com').trim();
const site = configuredSite || undefined;

export default defineConfig({
  site,
  output: 'static',
  integrations: site ? [sitemap({ filter: page => !/\/(?:404(?:\.html)?|cookies|privacy|terms)\/?$/.test(new URL(page).pathname) })] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
