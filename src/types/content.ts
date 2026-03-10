/**
 * Type definitions for src/data/content.json
 *
 * This is the single source of truth for the content schema.
 * All site copy lives in content.json — these types enforce its shape at build time.
 *
 * To add a field: update this interface first, then content.json, then the consuming component.
 */

export type AccentColor = 'violet' | 'mint' | 'coral' | 'gold' | 'rose';
export type BentoVariant = 'wide' | 'standard' | 'lead';

// ── Navigation ─────────────────────────────────────────────────────────────

export interface NavLink {
  name: string;
  url: string;
}

export interface Navigation {
  links: NavLink[];
}

// ── Hero ───────────────────────────────────────────────────────────────────

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroSecondaryAction {
  label: string;
  href: string;
}

export interface Hero {
  protocol: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  cta: string;
  secondaryCta: HeroSecondaryAction;
  stats: HeroStat[];
}

// ── Bento / Areas ──────────────────────────────────────────────────────────

export interface BentoArea {
  id: string;
  tag: string;
  title: string;
  description: string;
  variant: BentoVariant;
  /** @deprecated Legacy field from previous Tailwind implementation — not read by any component */
  theme?: string;
  /** @deprecated Legacy Tailwind grid class — layout is derived from `variant` */
  gridSpan?: string;
  /** @deprecated Legacy Tailwind class */
  bg?: string;
  /** @deprecated Legacy Tailwind class */
  border?: string;
  /** @deprecated Legacy Tailwind class */
  hoverBg?: string;
  /** @deprecated Legacy Tailwind class */
  direction?: string;
}

export interface Bento {
  header: string;
  protocol: string;
  areas: BentoArea[];
}

// ── About ──────────────────────────────────────────────────────────────────

export interface About {
  header: string;
  protocol: string;
  status: string;
  title: string;
  /**
   * Body paragraphs. May contain **bold** markdown syntax,
   * which About.astro converts to <strong> tags via parseBold().
   */
  paragraphs: string[];
}

// ── Projects ───────────────────────────────────────────────────────────────

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  /** Path relative to /public — e.g. "/img/project-minds.webp" */
  image: string;
  cta: string;
}

export interface Projects {
  header: string;
  protocol: string;
  items: ProjectItem[];
}

// ── Support ────────────────────────────────────────────────────────────────

export interface SupportOption {
  title: string;
  description: string;
  cta: string;
  url: string;
}

export interface Support {
  header: string;
  subtext: string;
  options: SupportOption[];
}

// ── Footer ─────────────────────────────────────────────────────────────────

export interface FooterLink {
  name: string;
  url: string;
}

export interface Footer {
  description: string;
  legal: FooterLink[];
  connect: FooterLink[];
  copyright: string;
  location: string;
}

// ── Root ───────────────────────────────────────────────────────────────────

export interface Content {
  navigation: Navigation;
  hero: Hero;
  bento: Bento;
  about: About;
  projects: Projects;
  support: Support;
  footer: Footer;
}
