<div align="center">

# nidhy.dev

*industrial engineer · systems thinker · AI builder*

**[nidhy.dev](https://nidhy.dev)** &nbsp;·&nbsp; [linkedin](https://www.linkedin.com/in/dnidhin97/) &nbsp;·&nbsp; [github](https://github.com/crackcode09) &nbsp;·&nbsp; [email](mailto:hello@nidhy.dev)

![Astro](https://img.shields.io/badge/Astro_7-FF5D01?style=flat-square&logo=astro&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-181717?style=flat-square&logo=github&logoColor=white)
![Static](https://img.shields.io/badge/100%25_static-4CAF50?style=flat-square)

</div>

---

5+ years across quality, manufacturing and operations. SPC dashboards that cut **$70–85K in annual scrap**. Quality inspection systems serving 40+ users across 4 departments. Building it all in the open, one commit at a time.

```text
build systems.
ship tools.
share the work.
```

---

## what's here

| Section | What you'll find |
| --- | --- |
| **hero** | Headline, links and a DMAIC "build log" terminal with an anime.js intro |
| **selected work** | Process engineering and data projects — real outcomes, real numbers |
| **field notes** | Writing on lean, systems, AI, and building — also as an RSS feed at [`/rss.xml`](https://nidhy.dev/rss.xml) |
| **about** | Spec sheet: background, toolkit, measured results, and how to reach me |

---

## stack

| Layer | Tech |
| --- | --- |
| Framework | Astro 7 — static output, no SSR |
| Content | Astro Content Layer API (`src/content.config.ts`) |
| Styling | Scoped CSS + design tokens (`src/styles/tokens.css`) |
| Fonts | Major Mono Display · Fraunces · Space Mono — self-hosted through Astro's fonts API, no Google Fonts |
| Motion | anime.js 4 (MIT), bundled into the site's own JS; respects reduced motion |
| Icons | Bootstrap Icons, inlined as SVG (`src/components/Icon.astro`) |
| Feed | `@astrojs/rss` → `/rss.xml` |
| Hosting | GitHub Pages + Cloudflare DNS |
| Design system | [`nidhy.dev-design`](https://github.com/crackcode09/nidhy.dev-design) — tokens, components and a website kit that mirrors this site |

---

## project structure

```text
src/
├── assets/fonts/      # Self-hosted font files (SIL OFL licences alongside)
├── components/        # Header, Footer, Wordmark, Icon, Label, Button, Chip, Panel, CodeBlock, Badge
├── content/
│   ├── writing/       # Field notes (.md with frontmatter)
│   └── projects/      # Project cards (.json)
├── layouts/
│   ├── Base.astro     # <head>, CSP, fonts, page transitions
│   └── Article.astro  # Field note page
├── pages/
│   ├── index.astro    # Homepage — hero, work, field notes, about
│   ├── writing/       # Listing + individual article pages
│   ├── projects/      # Full projects listing
│   ├── rss.xml.ts     # RSS feed of published field notes
│   └── 404.astro
├── scripts/
│   └── hero-motion.ts # Hero intro and build-log animation (anime.js)
└── styles/
    └── tokens.css     # Design tokens — colors, spacing, type scale
public/
├── .well-known/security.txt   # Security contact (RFC 9116)
├── images/, og/               # Photos and social share images
└── favicons, CNAME, site.webmanifest
.github/
├── workflows/ci.yml           # Build check on PRs into dev and main
├── workflows/deploy.yml       # Build + deploy to GitHub Pages on push to main
└── dependabot.yml             # Weekly npm and Actions updates, against dev
```

---

## local dev

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → ./dist/
npm run preview    # preview built output locally
```

---

## adding content

### writing post

Create `src/content/writing/[slug].md`:

```yaml
---
title: "Post title"
date: 2026-06-01
tag: "systems | ai | ie | build"
excerpt: "Max 160 chars — used on listing and meta description."
published: false
readingTime: 5
featured: false
---
```

### project

Create `src/content/projects/[slug].json`:

```json
{
  "name": "project name",
  "slug": "url-safe-slug",
  "lift": "red | green | gold | default",
  "tags": ["tag1", "tag2"],
  "blurb": "2-sentence max. What you built. Measured outcome.",
  "href": "/writing/case-study-slug",
  "status": "live | coming-soon | draft",
  "featured": true
}
```

`featured: true` shows on homepage (max 3). `status: "draft"` hides from all listings.

Lift color guide: `red` = cost/fix, `green` = build/growth, `gold` = capstone/leadership.

---

## deploy

Branch flow: `feature/* · fix/* · content/*` → PR into `dev` → PR `dev` → `main`.

- Every change goes through a pull request; nothing is pushed straight to `dev` or `main`.
- Merges use a **regular merge, not squash**: squash rewrites commit SHAs, so every later
  `dev` → `main` PR would conflict even with identical content.
- Merging into `main` runs `deploy.yml`, which builds the site and deploys it to GitHub Pages.

```bash
git checkout -b feature/my-change dev
gh pr create --base dev            # CI runs the build check; merge when green
gh pr create --base main --head dev
gh pr merge --merge                # regular merge, not squash
```

### branch rules

A repository ruleset on `main` and `dev` enforces this flow: pull request required, the
**Build check** (GitHub Actions) must pass on an up-to-date branch, review conversations
resolved, merge commits only, no force pushes or deletions.

### CI/CD and security

- Actions are pinned to full commit SHAs; Dependabot proposes updates.
- `ci.yml` runs with a read-only token and fails on critical `npm audit` findings.
- `deploy.yml` gives Pages and OIDC permissions to the deploy job only.
- Content Security Policy in `Base.astro`: scripts, styles, fonts and images from the site only.
- Security contact: [`/.well-known/security.txt`](https://nidhy.dev/.well-known/security.txt)
  (renew `Expires:` before 2027-10-01).

More detail for contributors (and AI assistants) is in [`CLAUDE.md`](CLAUDE.md).
