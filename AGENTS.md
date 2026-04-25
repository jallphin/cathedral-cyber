# Cathedral Cyber — Project Knowledge

## Architecture
- Static single-page site built with Astro (`src/` directory)
- Source: `src/pages/index.astro` assembles Layout + Nav + sections + Footer
- Sections: `src/sections/` (Hero, About, Services, Projects, Contact)
- Components: `src/components/` (Nav, Footer)
- Styles: `src/styles/global.css` — all theming via CSS custom properties
- Build output: `dist/` (Astro build) and `docs/` (GitHub Pages deployment)
- Deployed via GitHub Pages from `docs/` directory or GitHub Actions from `dist/`

## Design System
- **Two themes**: Terminal (cyan `#00d4ff`) and Forge (amber `#c87533`), toggled via `data-theme` attribute
- **Terminal fonts**: JetBrains Mono (headings) + IBM Plex Sans (body)
- **Forge fonts**: Bitter (headings) + Source Sans Pro (body)
- **Backgrounds**: Terminal `#0a0a0a`/`#141414`, Forge `#1a1a1a`/`#2a2a2a`
- **Theme toggle**: Persisted in `localStorage` as `cc-theme`
- **Forge grain**: CSS noise overlay via inline SVG `background-image`
- **Cards**: Left-border accent, hover dim glow. Arsenal cards recessed darker in Forge
- **Dividers**: Gradient fade `transparent -> accent -> transparent`
- **Scroll reveal**: IntersectionObserver with `.reveal` / `.visible` classes, respects `prefers-reduced-motion`

## Key Patterns
- All theme values use CSS custom properties (`--accent`, `--bg-primary`, etc.)
- Font loading via Google Fonts with `<link id="theme-fonts">` swapped on toggle
- FOUC prevention: inline `<script>` in `<head>` applies stored theme before paint
- Contact form: mailto-based, no backend
- Nav gains `.scrolled` class on scroll for solidified background
- `align-self: flex-start` on buttons prevents flex-stretch

## Build/Deploy
- `npm run build` → outputs to `dist/`
- Copy `dist/` contents to `docs/` for GitHub Pages branch deployment
- `.nojekyll` required in `docs/` to prevent Jekyll ignoring `_astro/` folder
- GitHub Actions workflow (`.github/workflows/deploy.yml`) deploys from `dist/` on push to `main`
