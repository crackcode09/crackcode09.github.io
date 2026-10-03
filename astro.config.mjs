import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nidhy.dev',
  output: 'static',
  // the course was retired — send old course links to the homepage
  redirects: {
    '/courses': '/',
    '/courses/zero-to-ai': '/',
    '/zero-to-ai': '/',
  },
});
