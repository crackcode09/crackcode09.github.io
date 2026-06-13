import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nidhy.dev',
  output: 'static',
  redirects: {
    '/zero-to-ai': '/courses/zero-to-ai',
  },
});
