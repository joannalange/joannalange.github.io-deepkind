# AGENTS.md — AI Agent Operations Guide

Quick reference for AI agents (and humans) making changes to this codebase.
Read this before touching any file.

---

## Golden Rule

**All user-facing text lives in `src/data/content.json` and nowhere else.**
Nothing in that file may be removed or reworded. Components render it; they do not own it.

---

## How to do common tasks

### Add or edit site copy
Edit `src/data/content.json` only.
- The structure is enforced by `src/types/content.ts` — if you change the shape, update the interface too.
- Build will fail (`satisfies Content` check in `src/data/content.ts`) if the JSON is structurally invalid.

### Add a new bento area
1. Add an entry to `content.json → bento.areas[]` with fields: `id`, `tag`, `title`, `description`, `variant`, `accent`.
2. Place a matching SVG at `public/assets/bento-{id}.svg`.
3. No code changes needed — `Bento.astro` and `BentoCard.astro` are fully data-driven.

### Add a new project
1. Add an entry to `content.json → projects.items[]`.
2. Place the image at `public/img/project-{slug}.webp`.
3. No code changes needed — `Projects.astro` maps items automatically.

### Change a color or spacing token
Edit `src/styles/global.css` inside the `@theme` block.
- All CSS custom properties (`--color-*`, `--text-*`, `--pad-*`) are defined there.
- Do NOT use raw rgba/hex values in component CSS — reference the tokens.

### Change a button style
Edit `src/styles/components/button.css`.
- To add a new button variant: add `.btn--{variant}` CSS, then add the name to the `ButtonVariant` union in `src/components/ui/Button.astro`.

### Change section layout or styling
Each section has its own CSS file — edit only the relevant one:

| Section | CSS file | Astro component |
|---|---|---|
| Nav | `src/styles/components/nav.css` | `src/components/layout/Nav.astro` |
| Hero | `src/styles/components/hero.css` | `src/components/sections/Hero.astro` |
| Bento / Areas | `src/styles/components/areas.css` | `src/components/sections/Bento.astro` |
| About | `src/styles/components/about.css` | `src/components/sections/About.astro` |
| Projects | `src/styles/components/projects.css` | `src/components/sections/Projects.astro` |
| Support | `src/styles/components/support.css` | `src/components/sections/Support.astro` |
| Footer | `src/styles/components/footer.css` | `src/components/layout/Footer.astro` |

---

## File map

```
src/
├── data/
│   └── content.json          ← ALL site copy (canonical, never delete)
│   └── content.ts            ← typed wrapper (import this, not content.json)
├── types/
│   └── content.ts            ← Content interface — update when schema changes
├── scripts/
│   └── reveal.ts             ← scroll-reveal IntersectionObserver
├── styles/
│   ├── global.css            ← design tokens (@theme) + global resets
│   ├── components.css        ← index: @imports all component CSS files
│   └── components/
│       ├── label.css         ← .s-label
│       ├── button.css        ← .btn, .btn--*
│       ├── nav.css           ← .nav, .nav__*
│       ├── hero.css          ← .hero, .hero__*
│       ├── areas.css         ← .areas, .area-card*
│       ├── about.css         ← .about, .about__*
│       ├── projects.css      ← .project-featured, .project-card*
│       ├── support.css       ← .support, .support-panel*
│       └── footer.css        ← .footer, .footer__*
├── components/
│   ├── layout/
│   │   ├── BaseLayout.astro  ← HTML shell, SEO meta, skip link
│   │   ├── Nav.astro         ← fixed navigation header
│   │   └── Footer.astro      ← site footer
│   ├── sections/             ← one file per page section
│   │   ├── Hero.astro
│   │   ├── Bento.astro
│   │   ├── About.astro
│   │   ├── Projects.astro
│   │   └── Support.astro
│   └── ui/                   ← reusable primitive components
│       ├── Button.astro      ← <Button label href variant arrow />
│       ├── BentoCard.astro   ← <BentoCard id tag title ... />
│       ├── ProjectCard.astro ← <ProjectCard title category ... />
│       ├── ProtocolTag.astro ← <ProtocolTag label color />
│       └── SkipLink.astro    ← skip-to-content (accessibility)
└── pages/
    └── index.astro           ← page entry point, composes sections
```

---

## Design system quick reference

**Accent colors:** `violet` · `mint` · `coral` · `gold` · `rose`
**Section backgrounds:** dark (`#0D0B1A`) → light (`#FEFCF8`) → alt (`#F4F1FF`) → dark → darkest (`#07060F`)
**Section order:** NAV → HERO (dark) → BENTO (dark) → ABOUT (light) → PROJECTS (light-alt) → SUPPORT (dark) → FOOTER (darkest)
**Fonts:** Inter Tight (display/headlines) · Geist Sans (body) · Geist Mono (labels/CTAs/protocol tags)
