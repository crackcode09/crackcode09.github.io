import { defineConfig, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import figures from './src/lib/markdown-figures.mjs';

export default defineConfig({
  site: 'https://nidhy.dev',
  output: 'static',
  // field note images on their own line become numbered, captioned figures
  markdown: { processor: satteri({ hastPlugins: [figures] }) },
  // the course was retired — send old course links to the homepage
  redirects: {
    '/courses': '/',
    '/courses/zero-to-ai': '/',
    '/zero-to-ai': '/',
  },
  // Self-hosted brand fonts (latin subset from Fontsource, SIL OFL 1.1 — licences in
  // src/assets/fonts). Astro serves them from the site and generates size-matched
  // fallbacks, so text doesn't jump when the fonts arrive.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Major Mono Display',
      cssVariable: '--font-display',
      fallbacks: ['monospace'],
      options: {
        variants: [{ src: ['./src/assets/fonts/major-mono-display-latin-400-normal.woff2'], weight: 400, style: 'normal' }],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Space Mono',
      cssVariable: '--font-mono',
      fallbacks: ['monospace'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/space-mono-latin-400-normal.woff2'], weight: 400, style: 'normal' },
          { src: ['./src/assets/fonts/space-mono-latin-700-normal.woff2'], weight: 700, style: 'normal' },
          { src: ['./src/assets/fonts/space-mono-latin-400-italic.woff2'], weight: 400, style: 'italic' },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Fraunces',
      cssVariable: '--font-serif',
      fallbacks: ['serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/fraunces-latin-opsz-normal.woff2'], weight: '100 900', style: 'normal' },
          { src: ['./src/assets/fonts/fraunces-latin-opsz-italic.woff2'], weight: '100 900', style: 'italic' },
        ],
      },
    },
  ],
});
