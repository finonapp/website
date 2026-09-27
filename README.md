# Finon website

Marketing site for Finon (finon.app): Astro 5, Tailwind 4, TypeScript. Static output in `dist/`.

## Commands

Run from this folder, with bun (not npm):

- `bun install`
- `bun run dev` starts the dev server
- `bun run build` builds to `dist/`
- `bun run preview` serves the build

## Where things live

- `src/pages/` one file per URL: index, connections, support, terms, privacy
- `src/components/` the building blocks; each starts with a comment saying what it does
- `src/scripts/` browser scripts for animations and live connection availability
- `src/styles/global.css` the colour tokens (light and dark), the font and the fade-in helper
- `src/data/connections.ts` the providers shown as coins
- `src/assets/` images and the Onest font; `public/` favicons, manifest, robots and sitemap

The production origin is set with `site` in `astro.config.mjs`. The shared layout
uses it for each page's canonical and social URLs. Keep `public/sitemap.xml` in
sync when adding pages.

`/connections` reads `https://api.finon.app/connect/list` at build time for
searchable HTML, then fetches it on page load and every 60 seconds while the tab
is visible. Names, logos, asset types and availability all come from the API.
The last successful list is kept with a last-checked message if a refresh fails;
builds can still complete if the API is unavailable. The public API route must
return `Access-Control-Allow-Origin: *` for the credential-free browser request.

Project skills for Claude Code live in `../ai-skills/` (see the repo root CLAUDE.md).

## Analytics and app download attribution

`src/components/Posthog.astro` runs PostHog behavior analytics against the existing EU
project, loading when the browser is idle after page load. It uses built-in
pageview and interaction capture without a custom download-click event.
PostHog's automatic campaign-parameter and referrer persistence is disabled;
AppsFlyer handles attribution. Pageviews and interaction autocapture remain enabled.

`src/components/AppsFlyer.astro` runs AppsFlyer's OneLink Smart Script on every
page and replaces links matching `APP_STORE_URL` with an attributed
`https://link.finon.app/UNm5` URL. The original App Store links remain the
fallback when JavaScript or the SDK is unavailable.

The configuration from the supplied AppsFlyer export maps `utm_source`, then
`utm_content`, to the media source, defaults to `any_source`, enables SEO
attribution, and includes `af_ss_ui=true`. The SDK preserves incoming parameters
across pages. This is web-to-app attribution, not pageview or session analytics.

`public/scripts/appsflyer-smart-script-2.10.4.js` is the unmodified SDK code from
that export, served locally and deferred so it does not block HTML parsing.
When updating it, replace the versioned file and update the component's script
path. See the [AppsFlyer integration guide](https://dev.appsflyer.com/hc/docs/dl_smart_script_v2).
