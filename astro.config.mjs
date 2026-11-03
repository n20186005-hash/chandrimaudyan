import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const configuredSite = (process.env.PUBLIC_SITE_URL || 'https://chandrimaudyan.com').trim();
const site = configuredSite || undefined;

/* Bengali (default, no path prefix) and English (prefixed with `/en`) share URLs,
   so the sitemap can pair them automatically and emit hreflang alternates. */
const DEFAULT_LOCALE = 'bn';
const LOCALE_LABELS = { bn: 'bn-BD', en: 'en' };

export default defineConfig({
  site,
  output: 'static',
  integrations: site
    ? [
        sitemap({
          filter: page => !/\/(?:404(?:\.html)?|cookies|privacy|terms)\/?$/.test(new URL(page).pathname),
          i18n: {
            defaultLocale: DEFAULT_LOCALE,
            locales: LOCALE_LABELS
          },
          serialize(item) {
            if (!item.links || item.links.length === 0) return item;
            if (item.links.some(link => link.lang === 'x-default')) return item;
            const defaultEntry = item.links.find(link => link.lang === LOCALE_LABELS[DEFAULT_LOCALE]);
            if (!defaultEntry) return item;
            return { ...item, links: [...item.links, { lang: 'x-default', url: defaultEntry.url }] };
          }
        })
      ]
    : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
