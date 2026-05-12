// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kobayashitatamisyouten.com',
  output: 'static',

  integrations: [sitemap()],

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  build: {
    inlineStylesheets: 'auto'
  }
});
