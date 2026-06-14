# nidhy.dev — Claude Instructions

## Project

Personal website for Nidhin Dileepkumar at [nidhy.dev](https://nidhy.dev).
Built with Astro 6, static output, deployed via GitHub Pages from `crackcode09/crackcode09.github.io`.

## Tech Stack

- **Framework:** Astro 6 (static, no SSR)
- **Content:** Astro Content Layer API (`src/content.config.ts`)
- **Styling:** Scoped CSS with design tokens in `src/styles/tokens.css`
- **Components:** `src/components/` — Header, Footer, Base (layout), Label, Button, Chip, CodeBlock, Badge, Panel
- **Fonts:** Loaded in Base.astro via Google Fonts — display (Major Mono Display), serif (Fraunces), mono (Space Mono)
- **Design system:** `D:\nidhin.dev\content\brand\Nidhin Design System\` — canonical source of truth
  - `guidelines/design-kit.html` — visual reference (self-contained)
  - `tokens/` — colors, typography, shape, spacing token files
  - `components/core/` — component specs (Button, Label, Chip, Panel, CodeBlock, Badge, Quote)
  - `brand/claude-design-brief.md` — paste-ready brief for any new Claude design task

## Git Workflow

**Never commit directly to `dev` or `main`.** Always use a feature branch.

### Branch naming

- `feature/` — new pages, components, or functionality
- `fix/` — bug fixes
- `content/` — writing posts, copy changes

### Full flow

1. Create feature branch off `dev`
2. Commit changes to feature branch
3. Open PR targeting `dev` — CI runs build check
4. Once CI passes, merge PR into `dev`
5. Open PR from `dev` → `main` with auto-merge: `gh pr merge --auto --squash`
6. CI passes → auto-merges to `main` → GitHub Pages deploys automatically

**No manual touching of `main` ever.** CI/auto-merge handles it.

## Design Tokens

Key tokens from `src/styles/tokens.css`:

- `--blood` — brand red (primary accent)
- `--signal` — green (course accent)
- `--gold` — gold (capstone accent)
- `--ink`, `--ink-60`, `--ink-30`, `--ink-12` — text hierarchy
- `--paper`, `--paper-2`, `--paper-soft` — background hierarchy
- `--border` — `2px solid var(--ink)` (hard border, no radius)
- `--container-page: 1120px` — max content width
- `--space-1` through `--space-7` — spacing scale

Card shadow style: `box-shadow: 8px 8px 0 var(--accent)` — hard offset, no blur.

## Adding a New Course

### Your workflow (5 steps)

1. **Write a brief** — create `docs/courses/drafts/[course-slug].md`
   - Copy the template from `docs/courses/drafts/_template.md`
   - Fill in: title, audience, modules, projects, stats, repo URL, accent color, selling points
   - **This folder is gitignored — drafts stay local, never pushed to GitHub**

2. **Open a Claude session** and say:
   > "Build the course page for `docs/courses/drafts/[course-slug].md`"

3. **Claude will:**
   - Read the draft
   - Create `src/content/courses/[slug].json` (metadata — listing card auto-updates)
   - Create `src/pages/courses/[slug].astro` (full bespoke landing page)

4. **Review** — run `npm run dev`, check `/courses` and `/courses/[slug]`

5. **Commit and deploy**

### What Claude follows when building a course page

- Use `src/pages/courses/zero-to-ai.astro` as the structural reference
- Import path convention: `../../layouts/Base.astro`, `../../components/Header.astro`, etc.
- Accent color maps: `green → var(--signal)`, `red → var(--blood)`, `gold → var(--gold)`
- All CSS is page-scoped — no global style changes
- Match the hard-offset-shadow card language and mono/serif/display font hierarchy

### Content collection schema

Each course JSON (`src/content/courses/[slug].json`) must match:

```json
{
  "title": "string",
  "slug": "string (matches filename)",
  "description": "string (used on listing card)",
  "status": "live | coming-soon | draft",
  "label": "string (small badge text)",
  "accent": "green | red | gold | default",
  "modules": 0,
  "projects": 0,
  "duration": "string e.g. 8–16 weeks",
  "cost": "string e.g. $5 or free",
  "repo": "https://github.com/..."
}
```

`draft` status courses are excluded from the listing. `coming-soon` shows as a muted non-linked card.

## Adding a New Writing Post

### Your workflow

1. **Draft locally** — create `docs/writing/drafts/[slug].md`
   - Copy the template from `docs/writing/drafts/_template.md`
   - **This folder is gitignored — stays local, never pushed to GitHub**

2. **When ready** — create `src/content/writing/[slug].md` with frontmatter below

3. **Set `published: true`** when you want it live

### Frontmatter schema

```yaml
---
title: "Post title"
date: 2026-06-13
tag: "systems | ai | ie | build"
excerpt: "Max 160 chars — shown on listing and meta."
published: false   # set true when ready
readingTime: 5     # optional, minutes
featured: false    # optional, shows at top of list
---
```

## Adding a New Project

### Your workflow (4 steps)

1. **Write a brief** — create `docs/projects/drafts/[slug].md`
   - Copy the template from `docs/projects/drafts/_template.md`
   - Fill in: name, lift color, tags, blurb, metrics, case study outline
   - **This folder is gitignored — stays local, never pushed to GitHub**

2. **Create the JSON** — `src/content/projects/[slug].json`
   - Copy the JSON block from your draft
   - Set `status: "live"` and `href` to the case study URL when ready

3. **Review** — run `npm run dev`, check `/projects` and homepage

4. **Commit and deploy**

### Project JSON schema

Each project JSON (`src/content/projects/[slug].json`) must match:

```json
{
  "name": "lowercase project name",
  "slug": "url-safe-slug",
  "lift": "red | green | gold | default",
  "tags": ["tag1", "tag2"],
  "blurb": "2-sentence max. What you built. Measured outcome.",
  "href": "# or /writing/case-study-slug",
  "status": "live | coming-soon | draft",
  "featured": true
}
```

- `featured: true` → shows on homepage (max 3 displayed)
- `status: "draft"` → excluded from listing
- `status: "coming-soon"` → muted non-linked card on `/projects`
- Lift color guide: `red` = savings/fix, `green` = build/growth, `gold` = capstone/leadership

## Commands

```bash
npm run dev      # dev server at http://localhost:4321
npm run build    # production build to dist/
npm run preview  # preview built output
```
