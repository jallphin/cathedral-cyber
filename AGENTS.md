# Cathedral Cyber — Project Knowledge

## Architecture
- Static single-page site: `index.html` + `css/main.css` + `js/main.js`
- Assets: `assets/images/` (crest, favicon, founder portrait) + `assets/icons/` (SVG service icons, inlined in HTML)
- Deployed via GitHub Pages from `main` branch: https://jallphin.github.io/cathedral-cyber/
- Development branches: `v2` (dev), `main` (prod) — both must be kept in sync

## Design System (v1.0 Spec)
- **Colors**: Body `#0d1117` (--bg-primary), Surface/Card `#1c2333` (--bg-surface), Deep shadow `#080d14`
- **Accent**: Gold `#c9a84c` throughout (no amber variant)
- **Typography**: Cormorant Garamond (headings/italic), JetBrains Mono (monospace/terminal), Inter (body)
- **Key patterns**: All sections use `--bg-primary` as base bg. Cards use `--bg-surface` or `--bg-deep-shadow` for contrast.
- **Buttons**: `align-self: flex-start` to prevent flex-stretch in column layouts
- **Terminal prefix**: `.text-terminal::before` adds `>_ ` prefix automatically
- **Section dividers**: 120px gold rules with `>_` center motif
- **Logo wordmark**: Must show "CATHEDRAL CYBER" (not truncated to just "CATHEDRAL")

## Known Issues & Gotchas
- GitHub Pages caches aggressively — hard refresh (Ctrl+Shift+R) needed after pushes
- JS init order matters: `initFadeTargets()` must run before `initScrollFadeIn()` or sections stay invisible
- `.hero-text` is a flex column — without `align-self: flex-start`, buttons stretch to full width
- `--bg-secondary` (#1c2333) is defined but unused — sections should all use `--bg-primary` (#0d1117)

## Build/Deploy
- No build step — push to `main` triggers GitHub Pages rebuild
- After changes on main, always cherry-pick/merge to v2: `git checkout v2 && git merge main`
- Local dev server: `python3 -m http.server 8081` from project root