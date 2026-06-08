# nidhy.dev

Personal portfolio and blog of Nidhin Dileepkumar — industrial engineer, systems thinker, AI builder.

**Live:** [nidhy.dev](https://nidhy.dev)

## About

Built with Astro v6, deployed to GitHub Pages. Features selected work in process engineering and data, a writing section (field notes), and an about section with stack and contact.

## Stack

- **Framework:** Astro v6 (static)
- **Fonts:** Major Mono Display · Fraunces · Space Mono
- **Hosting:** GitHub Pages + Cloudflare DNS
- **Domain:** nidhy.dev

## Local dev

```bash
npm install
npm run dev        # localhost:4321
npm run build      # production build → ./dist/
npm run preview    # preview build locally
```

## Writing new articles

Add a `.md` file to `src/content/writing/`:

```yaml
---
title: "your post title"
date: 2026-06-01
tag: lean6sigma
excerpt: "one sentence summary"
published: false   # flip to true when ready to go live
---
```

## Deploy

Push to `main` → GitHub Actions builds and deploys automatically to GitHub Pages.
