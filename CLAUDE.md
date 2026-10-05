# nidhy.dev — Claude Instructions

## Project

Personal website for Nidhin Dileepkumar at [nidhy.dev](https://nidhy.dev).
Built with Astro 7, static output, deployed via GitHub Pages from `crackcode09/crackcode09.github.io`.

## Tech Stack

- **Framework:** Astro 7 (static, no SSR)
- **Content:** Astro Content Layer API (`src/content.config.ts`)
- **Styling:** Scoped CSS with design tokens in `src/styles/tokens.css`
- **Components:** `src/components/` — Header, Footer, Base (layout), Label, Button, Chip, CodeBlock, Badge, Panel
- **Fonts:** self-hosted via Astro's fonts API (`astro.config.mjs`, files in `src/assets/fonts`) — display (Major Mono Display), serif (Fraunces), mono (Space Mono)
- **Markdown:** Astro 7's Sätteri processor (`@astrojs/markdown-satteri`, pinned to the version Astro uses — bump it with Astro) with one plugin, `src/lib/markdown-figures.mjs`
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
5. Open PR from `dev` → `main` with auto-merge using regular merge: `gh pr merge --auto --merge`
6. CI passes → auto-merges to `main` → GitHub Pages deploys automatically

**No manual touching of `main` ever.** CI/auto-merge handles it.

### CI/CD security

- Workflow actions are pinned to full commit SHAs with the version in a comment. Update them through Dependabot PRs, never back to a floating tag.
- `ci.yml` runs on pushes to `dev` and on PRs into `dev` and `main`, with a read-only token. It runs `npm audit --audit-level=critical` before the build.
- `deploy.yml` gives `pages: write` and `id-token: write` to the deploy job only.
- Dependabot (`.github/dependabot.yml`) opens weekly npm and Actions update PRs against `dev`.
- `public/.well-known/security.txt` (RFC 9116) expires 2027-10-01: renew the `Expires:` date before then. `deploy.yml` sets `include-hidden-files: true` on `actions/upload-pages-artifact`; without it (v4+) dot-folders like `.well-known` are left out of the deploy.

### Licensing

Code is MIT (`LICENSE`). Writing, project write-ups, photos and brand assets (`src/content/`,
`public/images/`, `public/og/`, favicons/app icons) are all rights reserved, as stated in the
README. New third-party code, fonts or icons must be MIT/OFL-compatible, with their licence noted.

### Branch rules

A repository ruleset on `main` and `dev` enforces the flow: pull request required (0 approvals,
since you can't approve your own PR), the **Build check** from GitHub Actions must pass on an
up-to-date branch, review conversations resolved, merge commits only, no force pushes or
deletions. Keep the owner bypass set to "for pull requests only".

> **Why `--merge` not `--squash` for dev→main:** Squash rewrites commit SHAs, causing history divergence. Every subsequent dev→main PR then conflicts even with identical content. Regular merge preserves the commit graph permanently.

## Design Tokens

Key tokens from `src/styles/tokens.css`:

- `--blood` — brand red (primary accent)
- `--signal` — green (secondary accent)
- `--gold` — gold (tertiary accent)
- `--ink`, `--ink-60`, `--ink-30`, `--ink-12` — text hierarchy
- `--paper`, `--paper-2`, `--paper-soft` — background hierarchy
- `--border` — `2px solid var(--ink)` (hard border, no radius)
- `--container-page: 1120px` — max content width
- `--space-1` through `--space-7` — spacing scale

Card shadow style: `box-shadow: 8px 8px 0 var(--accent)` — hard offset, no blur.

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

### Images, sources and collaborators

Put a post with images in its own folder (`src/content/writing/[slug]/index.md`) with the
images next to it. Images are optimised at build time and served from nidhy.dev (the CSP
blocks images from other sites).

```markdown
![alt text: what a screen reader should say](./images/spc-before.png "caption shown under the figure")
![alt text](./images/line-3.jpg "photo: shift change on line 3")
```

- An image on its own line becomes a framed figure, as wide as the text, with a numbered
  caption (`fig. 01 · …`) taken from the quoted title. No title, no caption. Readers can
  click a figure to open it full size.
- Start the caption with `photo:` for photos: they get the site's grayscale treatment.
  Diagrams and screenshots keep their colour. SVG diagrams work too.
- Always write real alt text; the caption is not read in its place.

Sources list (end of the post) and collaborators, in the frontmatter:

```yaml
sources:
  - name: "Bureau of Labor Statistics"
    url: "https://www.bls.gov/ooh/"
    logo: "./logos/bls.svg"      # optional; saved next to the post, else the first letter shows
with: [jane-doe]                  # file names in src/content/people/
```

Add a person once as `src/content/people/[id].json`, only with their permission:

```json
{ "name": "Jane Doe", "role": "quality engineer", "link": "https://www.linkedin.com/in/…", "photo": "./photos/jane-doe.jpg" }
```

`link` and `photo` are optional (no photo shows initials). Photos go in
`src/content/people/photos/` and get the About photo's grayscale treatment. Projects list
people the same way with `"collaborators": ["jane-doe"]`; they show as "built with" on
the project card. Use logos only to point at the source they belong to.

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
  "featured": true,
  "collaborators": ["jane-doe"]
}
```

- `collaborators` → optional, ids from `src/content/people/` (shown as "built with")
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
