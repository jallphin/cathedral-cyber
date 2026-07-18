# Cathedral Cyber — Website Revamp Plan

**Prepared by:** OpenHands (AI agent) on behalf of Cathedral Cyber  
**Date:** 2026 review cycle  
**Scope:** Usability, visual flow, visual appeal, and code consolidation for https://jallphin.github.io/cathedral-cyber/

---

## 1. Executive Summary

The Cathedral Cyber website currently exists as **two parallel implementations**:
1. A legacy static single-page site (`index.html` + `css/main.css` + `js/main.js`) with a gothic/gold cathedral aesthetic.
2. A newer Astro + Tailwind v4 build (`src/`) with a generic cyberpunk dark aesthetic and neon cyan/red accents.

This duality is the root problem. The live site (served by GitHub Pages from `index.html`) is the older design, while the Astro source is not being used as the production entry point. Both versions have brand, usability, and technical issues, but the **bigger opportunity** is to unify behind one ownable, conversion-focused identity.

**Primary recommendation:** Retain and refine the cathedral/gothic brand (it is unique and ownable), rebuild it on the Astro stack for maintainability, and retire the legacy static files.

---

## 2. In-Depth Review Findings

### 2.1 Architecture & Build

| Finding | Severity | Detail |
|---------|----------|--------|
| Two competing sites in one repo | **Critical** | `index.html` is live; `src/pages/index.astro` is orphaned. Creates confusion, duplicate maintenance, and brand split. |
| Dependencies not installed | High | `npm ls` shows all dependencies as unmet. Build (`astro build`) likely fails on a fresh clone. |
| Outdated AGENTS.md | Medium | Still documents the old static architecture and instructs merging `main` into `v2`, which no longer matches current structure. |
| Unused Astro components | Medium | `Card.astro`, `Badge.astro`, `SectionTitle.astro` exist but sections inline their own markup, defeating component reuse. |
| Orphan remote branches | Low | `site-revamp-claude-2026` and `site-revamp-kimi-2026` suggest abandoned experiments; should be pruned. |
| No `robots.txt` / sitemap / structured data | Medium | Hurts SEO and discoverability for a B2B federal contractor. |

### 2.2 Visual Identity & Brand

**What works:**
- The name **"Cathedral Cyber"** is distinctive. The gothic/cathedral metaphor — *built to last, stone-solid security in a volatile digital world* — is powerful for a federal/DoD audience.
- Gold (`#c9a84c`) and dark stone (`#0d1117`) from the old design feel premium, serious, and differentiated.

**What doesn't:**
- The Astro build abandons the cathedral theme for a generic cyberpunk dark look (cyan `#00f0ff`, pink `#ff3864`, Space Grotesk). It could be any SaaS security vendor.
- The legacy site's founder-title copy is jokey and long: *"Grand Master Allphin, the Unbothered, First of His Name…"*. This undermines credibility for federal buyers.
- The founder portrait dominates the About section. For a B2B brand, the imagery should emphasize mission, methodology, and trust, not a medieval title.
- The legacy `body::before` noise overlay (z-index 10000) adds grain to the entire viewport and cheapens the visual finish.

### 2.3 Usability & Flow

| Finding | Severity | Detail |
|---------|----------|--------|
| No trust/social proof section | **Critical** | Federal buyers need past performance, clearances, certifications, contract vehicles. None are visible. |
| Contact form only opens mailto | High | For high-stakes B2B/federal inquiries, mailto is fragile (no guaranteed delivery, no CRM, no confirmation). |
| Single primary CTA | Medium | Hero has one button; no secondary path for visitors not ready to "enter"/contact. |
| Section anchors inconsistent | Medium | Old nav uses `#services`, `#tools`, `#contact`; new nav uses `#capabilities`, `#arsenal`, `#contact`. Labels should match sections. |
| Mobile menu works but is bare | Low | No contact CTA inside the mobile menu; animations are abrupt. |
| No progress/wayfinding | Low | Long single-page scroll with only a nav bar; no sticky sub-nav or progress indicator. |
| Loader delays first paint | Medium | 800ms artificial loader blocks content. It adds friction without value. |
| Typewriter starts after loader | Low | Content is invisible until animation runs; accessibility and SEO suffer. |

### 2.4 Visual Appeal

| Finding | Severity | Detail |
|---------|----------|--------|
| Heavy noise overlay | Medium | The legacy grain overlay at `opacity: 0.035` over z-index 10000 dulls every element and makes text feel dirty. |
| Inconsistent border radius | Low | Old design uses `0px` (sharp) and `2px`; new uses `rounded-xl`. Pick one family. |
| Duplicated inline SVGs | Low | Service icons are inlined in both `index.html` and `Services.astro`. Icons should be components or an icon set. |
| Card hover is generic | Low | The `translateY(-1px)` + glow pattern is fine but overused; needs an ownable micro-interaction. |
| Hero imagery unclear | Medium | The crest in the hero may not read at small sizes; a vector wordmark or abstract cathedral motif would scale better. |
| Empty/unused components | Low | Unused components and inline markup create visual inconsistency. |

### 2.5 Code Quality

| Finding | Severity | Detail |
|---------|----------|--------|
| Componentization not used | High | Sections duplicate card markup; `Card.astro` and `Badge.astro` are ignored. |
| Tailwind v4 `@theme` vs CSS custom props | Medium | Two token systems exist. Tailwind v4 `@theme` is modern but not documented in the repo. |
| GSAP only used for basic fades | Low | Adding GSAP just for opacity/translate reveals is overkill. Native `IntersectionObserver` is sufficient and lighter. |
| `lucide-astro` installed but unused | Low | Package adds weight without usage. |
| Font loading suboptimal | Medium | Old site loads 4 Google Fonts in one request with `display=swap` but no font-display strategy in the new Layout. |
| Image assets oversized | Medium | `assets/images/` is 8.7MB. PNGs (e.g., `wordmark-logo.png` 2.2MB) are much larger than equivalent JPG/WebP. |
| No TypeScript strictness | Low | `tsconfig.json` exists; verify strict mode and component prop validation. |

### 2.6 Performance

- **First paint delay:** loader adds 800ms after `load` event.
- **Image bloat:** 8.7MB of images; only the WebP/JPG versions should ship; oversized PNGs should be removed or optimized.
- **Font render-blocking:** Google Fonts loaded without `&display=swap` in the Astro layout (legacy does include it).
- **Unused JS library:** GSAP could be removed if scroll reveals are implemented with CSS + IntersectionObserver.

### 2.7 Accessibility

- Legacy has reasonable focus states, `aria-label`s, and reduced-motion handling.
- Typewriter text starts empty; screen readers may not announce the updated phrase unless `aria-live` is used.
- Mobile nav toggle has correct ARIA in Astro version but legacy uses a hamburger span with no visible label issue (it does have `aria-label`).
- Form labels and required states are present in both versions.

---

## 3. Strategic Direction

### 3.1 Brand Positioning — Gothic Minimalism

The original gold/cathedral execution was too ostentatious. The revamp reinterprets "cathedral" as **structural minimalism**: the feeling of standing inside a vast stone nave — cool air, indirect light, massive quiet, and absolute precision. No scrollwork, no heraldic excess, no medieval titles.

> **"Engineered like stone. Operated like a red team."**

Visual metaphors:
- **Stone** — backgrounds, surfaces, borders.
- **Shadow** — depth and negative space.
- **Single shafts of light** — thin accent rules, hover states, focus rings.
- **Geometry** — arches, vault ribs, grids, and column rhythm translated into layout.

The brand is now **monastic, not ornate**. Gold is reduced from a dominant color to a single hairline accent (like a candle flame or a gilt edge).

### 3.2 Tone of Voice

- **Confident, not arrogant.** Replace aggressive lines like *"We don't respond to unsolicited sales inquiries"* with *"Engagements are by referral or direct inquiry. Tell us what you're defending."*
- **Clear over clever.** Retire the jokey founder title; use a short, credible bio instead.
- **Federal-grade.** Language should feel like a capable subcontractor, not a Twitter persona.

### 3.3 Recommended Color System — Restrained Stone Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#090a0c` | Page background — near-black stone |
| `--bg-surface` | `#111316` | Cards, nav, form panels |
| `--bg-raised` | `#181b20` | Hover/focus states |
| `--stone` | `#2a2f36` | Structural borders, dividers |
| `--stone-light` | `#3d444d` | Hover borders |
| `--accent` | `#a48b4e` | **Single** accent: 1px rules, focus rings, active nav, CTA hover |
| `--accent-dim` | `#6b5c32` | Subtle accent backgrounds |
| `--text-primary` | `#e8eaed` | Headings, body |
| `--text-secondary` | `#98a0a8` | Descriptions, labels |
| `--text-muted` | `#5a6169` | Captions, dividers |
| `--success` | `#5e8c6a` | Valid/confirmation (sparingly) |
| `--danger` | `#8f3b3b` | Errors |

No cyan, no magenta, no neon. The only warm tone is the restrained gold accent used as a thin line, not a flood.

### 3.4 Typography

- **Display / wordmark:** `Space Grotesk` — clean, geometric, institutional. Used in uppercase with wide letter-spacing for the wordmark only.
- **Body:** `Inter` — neutral, readable.
- **Mono:** `JetBrains Mono` — terminal/code snippets and the `>_` motif.
- **Accent / quotes:** `Cormorant Garamond` may still appear in one or two short mission statements if needed, but only as italic body text, never as a heading.

**No Cinzel.** The gothic vibe now comes from layout and negative space, not blackletter/roman display type.

---

## 4. Revamp Plan

### Phase 1 — Consolidate the Codebase

**Goal:** End the two-site split and make the Astro build the single source of truth.

1. **Archive or delete legacy static files**
   - Rename `index.html` → `index.legacy.html` (or remove if no longer needed).
   - Rename `css/main.css` → `css/main.legacy.css` and `js/main.js` → `js/main.legacy.js`.
   - Update `AGENTS.md` to describe the Astro build, deployment, and branch strategy.

2. **Fix dependency state**
   - Run `npm install` and commit `package-lock.json` if changed.
   - Verify `astro build` and `astro preview` work.
   - Add a CI check (GitHub Action) that runs `npm run build` on PRs.

3. **Clean up branches**
   - Review `site-revamp-claude-2026` and `site-revamp-kimi-2026`; delete if stale.
   - Decide whether `v2` is still needed or should be retired.

4. **Re-route GitHub Pages**
   - If keeping static deployment, configure `astro.config.mjs` output to `dist/` and set GitHub Pages to publish from the `gh-pages` branch or via GitHub Action.
   - Ensure `base: '/cathedral-cyber'` is correct and all asset paths resolve.

### Phase 2 — Rebuild Visual System in Astro

**Goal:** Make the site look ownable, premium, and consistent.

1. **Design tokens**
   - Replace the Tailwind v4 cyberpunk tokens with the restrained stone palette above.
   - Document tokens in `src/styles/tokens.css` and reference them in `global.css`.
   - No noise overlays, no heavy gradients, no neon glows. Flat planes, 1px rules, one accent.

2. **Componentize everything**
   - Use `Card.astro`, `Badge.astro`, and `SectionTitle.astro` in every section.
   - Create new components:
     - `Icon.astro` — for service/project icons (support `name` prop).
     - `Button.astro` — primary, secondary, ghost variants.
     - `Stat.astro` — for the About stats grid.
     - `ToolCard.astro` — for the Arsenal section.
     - `TrustBar.astro` — logos/badges for clearance/contract vehicles.

3. **Layout**
   - Refine `Layout.astro`:
     - Use gold-system favicon (not generic cyan triangle).
     - Add `robots.txt`, sitemap generation, and Open Graph / Twitter meta.
     - Load fonts with `display=swap`.

4. **Hero — A Single Stone Nave**
   - No loader. Full viewport, almost black, massive vertical space.
   - One thin 1px accent rule above the wordmark.
   - Headline in `Space Grotesk` uppercase, tightly tracked: **"ENGINEERED LIKE STONE. OPERATED LIKE A RED TEAM."**
   - Subhead in `Inter`, left-aligned (not centered) on desktop to break SaaS-template symmetry.
   - Primary CTA: **"Start an engagement"** — minimal button, 1px stone border, gold hover fill.
   - Secondary CTA: **"View capabilities"** — text-only with a small arrow.
   - Add a slow vertical scroll hint at the bottom: a single thin line that pulses subtly.

5. **About / Mission — Columns and Vault Lines**
   - Remove the founder portrait as the dominant visual. Use a structural grid instead.
   - Short founder bio if needed; no titles, no heraldry.
   - Add a **Trust Bar** as a row of thin vertical rules with labels: Clearance Level, CMMC, RMF, NIST 800-171, etc.
   - Stats grid in four equal stone cells with 1px borders — no rounded corners, no shadows.
   - Pull quote in `Cormorant Garamond` italic if desired, but small and quiet.

6. **Capabilities (Services) — Stone Grid**
   - Rename section consistently to "Capabilities" (nav label should match).
   - Use the `Card` component: 1px stone borders, no radius, no shadows.
   - Accent appears only on hover as a 1px top rule and a faint inner-left glow.
   - Icons are thin, geometric, monochromatic until hover.
   - Add one sentence of depth per card; reserve "Learn more" drawers for a later phase.

7. **Arsenal (Projects) — Workshop Bench**
   - Rename consistently to "Arsenal".
   - Use `ToolCard` with GitHub stars/forks when available.
   - Direct download / documentation links if applicable.
   - Active/open-source badges become simple pill outlines in stone/accent.
   - No neon badges.

8. **Contact / Engage — Stone Panel**
   - Rename section to **"Engage"** or keep "Establish Contact".
   - Form sits inside a 1px bordered panel on a slightly raised surface.
   - Two-step form: identity, then scope.
   - Inline validation messages; no browser `alert()`.
   - On submit, show a clear confirmation state even if the backend is still mailto.
   - Provide a direct `mailto:` fallback and a booking-link placeholder.

9. **Footer**
   - Add sitemap links, social links (GitHub, LinkedIn), and a brief tagline.
   - Keep the cursor-blink motif as an easter egg but don't let it dominate.

### Phase 3 — Improve Usability & Flow

1. **Sticky progress sub-nav**
   - Optional: a thin progress bar under the nav that fills as the user scrolls.

2. **Better anchor scrolling**
   - Add `scroll-padding-top` equal to nav height so anchors don't hide under the sticky nav.
   - Use native `scroll-behavior: smooth` and remove JS scroll interception where possible.

3. **CTA placement**
   - Add a floating or inline secondary CTA after the About and Arsenal sections.
   - Make the contact form prominent, not apologetic.

4. **Mobile experience**
   - Full-screen mobile menu with clear hierarchy.
   - Larger tap targets on cards and buttons.
   - Ensure the hero wordmark is legible at small sizes.

5. **Error / success feedback**
   - Inline form validation messages.
   - A non-alert success state (e.g., "Transmission logged — we'll respond within 48 hours.").

6. **Content hierarchy**
   - Each section should pass the "5-second test": headline, one-line value, visual, CTA.

### Phase 4 — Performance & Accessibility

1. **Remove the loader entirely**
   - No splash screen. First paint should be the hero content.

2. **Image cleanup**
   - Delete unused oversized PNGs if WebP/JPG equivalents exist.
   - Serve responsive images with `srcset`.
   - Add `decoding="async"` and `loading="lazy"` where appropriate.

3. **Font strategy**
   - Use `&display=swap`.
   - Self-host critical fonts if possible (fewer requests).

4. **Remove GSAP if underutilized**
   - Implement scroll reveals with `IntersectionObserver` + CSS classes.
   - Keep GSAP only if advanced sequencing is needed later.

5. **Accessibility pass**
   - Add `aria-live="polite"` to the typewriter target or remove the typewriter.
   - Verify color contrast ratios for gold on dark.
   - Test keyboard navigation through all interactive elements.
   - Run Lighthouse and axe-core and resolve critical issues.

6. **SEO**
   - Add JSON-LD structured data for `Organization` and `ProfessionalService`.
   - Generate sitemap during build.
   - Add canonical URL and Open Graph image.

---

## 5. Implementation Roadmap

| Phase | Tasks | Estimated Effort |
|-------|-------|------------------|
| **1. Consolidate** | Archive legacy files, install deps, fix build, clean branches | 1–2 days |
| **2. Visual System** | Tokens, components, hero, about, capabilities, arsenal, contact, footer | 3–5 days |
| **3. Usability** | Anchors, CTAs, mobile menu, form feedback, content hierarchy | 2–3 days |
| **4. QA & Perf** | Image cleanup, remove loader, accessibility, SEO, Lighthouse | 2–3 days |
| **5. Soft Launch** | Deploy to staging branch, review on mobile/desktop, gather feedback | 1–2 days |
| **6. Launch** | Merge to `main`, update GitHub Pages, retire legacy | 1 day |

**Total estimated effort:** 10–16 days of focused work, depending on asset creation and copywriting depth.

---

## 6. Success Metrics

After launch, measure:
- **Lighthouse scores:** ≥ 90 in Performance, Accessibility, Best Practices, SEO.
- **First Contentful Paint:** ≤ 1.2s on mobile 4G.
- **Contact form completion rate:** track via mailto or a simple analytics event.
- **Scroll depth:** how far visitors get down the page.
- **Qualitative feedback:** 3–5 federal/defense contacts review the site and rate clarity and credibility.

---

## 7. Immediate Next Steps

1. Decide whether to keep the Astro stack (recommended) or return to a clean static build.
2. Approve the brand direction: **cathedral/gold/institutional** vs generic cyberpunk.
3. Confirm which trust signals and contract vehicles can be displayed.
4. Run `npm install` and commit the lockfile; verify `npm run build`.
5. Begin Phase 1 by archiving the legacy `index.html`, `css/main.css`, and `js/main.js`.

---

*This plan was generated by OpenHands on behalf of Cathedral Cyber. It is intended as a starting point for discussion and should be prioritized with the team before implementation.*
