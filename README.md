<div align="center">

# nidhy.dev

*industrial engineer · systems thinker · AI builder*

**[nidhy.dev](https://nidhy.dev)** &nbsp;·&nbsp; [linkedin](https://www.linkedin.com/in/dnidhin97/) &nbsp;·&nbsp; [github](https://github.com/crackcode09) &nbsp;·&nbsp; [email](mailto:dileepkumarnidhin@outlook.com)

![Astro](https://img.shields.io/badge/Astro_6-FF5D01?style=flat-square&logo=astro&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-181717?style=flat-square&logo=github&logoColor=white)
![Static](https://img.shields.io/badge/100%25_static-4CAF50?style=flat-square)

</div>

---

Four years in manufacturing CI. SPC dashboards that cut **$70–85K in annual scrap**. Quality inspection systems serving 40+ users across 4 departments. Building it all in the open, one commit at a time.

```text
build systems.
ship tools.
share the work.
```

---

## what's here

| Section | What you'll find |
| --- | --- |
| **selected work** | Process engineering and data projects — real outcomes, real numbers |
| **courses** | Structured learning paths built in public |
| **field notes** | Writing on lean, systems, AI, and building |
| **about** | Stack, background, and how to reach me |

---

## stack

| Layer | Tech |
| --- | --- |
| Framework | Astro 6 — static output, no SSR |
| Content | Astro Content Layer API |
| Styling | Scoped CSS + design tokens (`src/styles/tokens.css`) |
| Fonts | Major Mono Display · Fraunces · Space Mono |
| Hosting | GitHub Pages + Cloudflare DNS |

---

## project structure

```text
src/
├── components/        # Header, Footer, Base, Label, Button, Chip, Panel, CodeBlock, Badge
├── content/
│   ├── writing/       # Blog posts (.md with frontmatter)
│   ├── courses/       # Course metadata (.json)
│   └── projects/      # Project cards (.json)
├── pages/
│   ├── index.astro    # Homepage — hero, work, field notes, about
│   ├── writing/       # Listing + individual article pages
│   ├── courses/       # Listing + bespoke landing pages
│   └── projects/      # Full projects listing
└── styles/
    └── tokens.css     # Design tokens — colors, spacing, type scale
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

### course

Create `src/content/courses/[slug].json`:

```json
{
  "title": "Course title",
  "slug": "url-safe-slug",
  "description": "Shown on listing card.",
  "status": "live | coming-soon | draft",
  "label": "badge text",
  "accent": "green | red | gold | default",
  "modules": 8,
  "projects": 3,
  "duration": "8–16 weeks",
  "cost": "$5",
  "repo": "https://github.com/..."
}
```

Then create `src/pages/courses/[slug].astro` using `zero-to-ai.astro` as the structural template.

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

Branch flow: `feature/* → dev → PR → main`

Never commit directly to `dev` or `main`. Merges into `main` use regular merge — not squash — to keep the commit graph intact and prevent recurring conflicts.

```bash
git checkout -b feature/my-change

gh pr create --base dev        # wait for CI

gh pr create --base main
gh pr merge --auto --merge     # regular merge, not squash
```

Push to `main` triggers GitHub Actions — builds and deploys to GitHub Pages automatically.
