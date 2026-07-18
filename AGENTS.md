# Cathedral Cyber — Project Knowledge

## Architecture
- Astro static site in `src/` built to `dist/`.
- Entry page: `src/pages/index.astro`.
- Layouts: `src/layouts/Layout.astro`.
- Sections: `src/sections/`.
- Reusable components: `src/components/`.
- Styles: `src/styles/tokens.css` (Tailwind v4 theme) + `src/styles/global.css`.
- Public assets: `public/assets/images/` (copied to `dist/` as-is).
- Legacy static files archived as `index.legacy.html`, `css/main.legacy.css`, `js/main.legacy.js`.
- Site: https://jallphin.github.io/cathedral-cyber/

## Design System — Gothic Minimalism
- **Palette**: near-black stone backgrounds, 1px stone borders, restrained gold accent (`#a48b4e`) used only for hairline rules, focus rings, hover fills, and active states.
- **No**: neon colors, heavy gradients, noise overlays, rounded corners on cards, shadows, Cinzel/blackletter type.
- **Yes**: flat planes, precise geometry, generous negative space, Space Grotesk display type, Inter body, JetBrains Mono terminal prompts.
- **Brand line**: *Engineered like stone. Operated like a red team.*

## Component Patterns
- Use `Card.astro`, `Badge.astro`, `SectionTitle.astro`, `Button.astro`, `Icon.astro`, `Stat.astro`, `TrustBar.astro`, `ToolCard.astro`, `ToolCardContent.astro`.
- Cards have 1px stone borders, no border-radius, no shadows. Accent appears on hover as a 1px top rule.
- Buttons: `primary` (accent border + hover fill), `secondary` (stone border), `ghost` (text + arrow).

## Build/Deploy
- `npm install` then `npm run build`.
- Build output: `dist/`.
- Deploy `dist/` to GitHub Pages via a GitHub Action (recommended) or the `gh-pages` branch.
- Local dev: `npm run dev` (or `npm run preview` after a build).
- GitHub Pages `base` path is `/cathedral-cyber` — keep asset and route paths consistent with `astro.config.mjs`.

## Known Issues & Gotchas
- GitHub Pages caches aggressively — hard refresh (Ctrl+Shift+R) needed after pushes.
- The remote branches `site-revamp-claude-2026` and `site-revamp-kimi-2026` are stale; confirm before deleting.
- `v2` branch is legacy; it can be retired once the Astro build is deployed from `main`.
- Do not reintroduce GSAP unless a specific advanced animation requires it. Use CSS + IntersectionObserver for scroll reveals.
