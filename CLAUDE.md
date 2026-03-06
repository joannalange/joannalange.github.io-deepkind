# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

DeepKind Foundation — Polish NGO website. Full redesign in progress.
Framework: Astro + Tailwind CSS v4 (not yet scaffolded).

## Core Constraint

All text in `src/data/content.json` must remain present and unmodified. Nothing removed, nothing changed. Decorative labels, category chips, and section protocol tags may be added freely.

## Data

- `src/data/content.json` — canonical source for all site copy (nav, hero, bento, about, projects, support, footer)
- `src/data/theme.json` — design tokens (colors, spacing, typography)
- `src/data/bento.json` — superseded by the `bento` key in `content.json`; treat as reference only

## Design System

**Palette:** warm off-white `#FAFAF8` (light base), deep indigo-black `#0C0E1A` (dark sections), cyan `#00E5FF` (tech accent), purple `#7C3AED` (nature/agency), rose `#FB7185` (empathy).

**Typography:** Inter Tight (display/headlines), Geist Sans (body), Geist Mono (protocol tags, CTAs, system labels).

**Visual language — "Warm Precision":** alternating dark/light strata. Dark sections = system/tech voice (monospace tags, grid lines, cyan). Light sections = human/warmth voice (generous space, organic shapes). The two aesthetics intentionally interrupt each other.

**Section strata order:** NAV → HERO (dark) → BENTO (dark) → ABOUT (light) → PROJECTS (light) → SUPPORT (dark) → FOOTER (darkest)

## Assets

Images go in `public/img/`. Four project images are pending generation (photorealistic, 3:2):
- `project-minds.webp` — Minds & Muscles
- `project-kindness.webp` — Kindness Lab
- `project-retreat.webp` — Deep & Kind Retreat
- `project-hackathon.webp` — GrowUP Hackathon

SVG assets (logo, hero illustration, bento card decorations, about illustration) are generated inline or placed in `src/assets/`.
