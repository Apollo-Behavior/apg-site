# APG website redesign: interactive preview

A static preview of the proposed Autism Providers of Georgia (autismga.org) redesign, for review only. It is not the official APG site.

- `index.html`: Home (the "How APG works" rail is clickable)
- `about.html`, `updates.html` (filter buttons work), `join.html`, `contact.html`
- `google-sites-version.html`: the same Home page built within Google Sites' limits, for comparison

Plain HTML/CSS/JS with no build step. Styles come from the APG design system (`css/bundle.css`, `css/apg-tokens.css`). Icons: Lucide (ISC license). Pages carry `noindex` so search engines skip them.

Bracketed text like `[Date]` or `[Photo]` marks content still to be supplied.

## Hosting (Cloudflare Pages)

Deployed by Cloudflare Pages' GitHub integration: every push to `main` updates production, and every other branch gets its own preview URL. There is no build; Pages serves the repo root as-is.

Pages settings: framework preset `None`, build command empty, build output directory `/`.

- `_headers`: response headers, including `X-Robots-Tag: noindex` (remove when this becomes the live site)
- `404.html`: served for any missing URL. Without it, Pages would serve the home page for every unknown path.
- Pages drops `.html` from URLs (`/about.html` redirects to `/about`); the relative links still work.

Preview locally the way Pages serves it: `npx wrangler pages dev .`
