# Finon website

Marketing site for Finon (finon.app): Astro 5, Tailwind 4, TypeScript. Static output in `dist/`.

## Commands

Run from this folder, with bun (not npm):

- `bun install`
- `bun run dev` starts the dev server
- `bun run build` builds to `dist/`
- `bun run preview` serves the build

## Where things live

- `src/pages/` one file per URL: index, support, terms, privacy
- `src/components/` the building blocks; each starts with a comment saying what it does
- `src/scripts/` the four small browser scripts: coinPing, letterReveal, dockTile, fadeIn
- `src/styles/global.css` the colour tokens (light and dark), the font and the fade-in helper
- `src/data/connections.ts` the providers shown as coins
- `src/assets/` images and the Onest font; `public/` favicons, manifest, robots and sitemap

Project skills for Claude Code live in `../ai-skills/` (see the repo root CLAUDE.md).
