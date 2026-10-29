# APG website redesign: interactive preview

A static preview of the proposed Autism Providers of Georgia (autismga.org) redesign, for review only. It is not the official APG site.

- `index.html`: Home (the "How APG works" rail is clickable; all seven steps are in the HTML so search engines and AI tools can read them without JavaScript)
- `about.html`, `updates.html` (filter buttons work), `join.html`, `faq.html`, `contact.html`

Plain HTML/CSS/JS with no build step. Styles come from the APG design system (`css/bundle.css`, `css/apg-tokens.css`). Icons: Lucide (ISC license).

Bracketed text like `[rate]` or `[APG to confirm: …]` marks content still to be supplied. Each one has a `<!-- TODO(launch) -->` comment; list them with `grep -rn "TODO(launch)" .`

## Hosting (Cloudflare Pages)

Deployed by Cloudflare Pages' GitHub integration: every push to `main` updates production, and every other branch gets its own preview URL. There is no build; Pages serves the repo root as-is.

Pages settings: framework preset `None`, build command empty, build output directory `/`.

- `_headers`: response headers, including `X-Robots-Tag: noindex` (remove when this becomes the live site)
- `404.html`: served for any missing URL. Without it, Pages would serve the home page for every unknown path.
- Pages drops `.html` from URLs (`/about.html` redirects to `/about`); the relative links still work.

Preview locally the way Pages serves it: `npx wrangler pages dev .`

## Search and AI visibility

- Every page has a canonical URL on `https://autismga.org`, Open Graph and Twitter tags (share image: `assets/og-image.jpg`), and square favicons.
- `index.html` carries `Organization` and `WebSite` structured data (JSON-LD). `faq.html` carries `FAQPage` data that must match the visible questions and answers word for word: edit both together.
- `robots.txt` allows all crawlers, AI assistants included, and points to `sitemap.xml`. Add new pages to `sitemap.xml` and `llms.txt`.
- `llms.txt` is a plain-language summary for AI tools. It's a proposed convention, so treat it as cheap insurance rather than a guarantee.

Until launch, every page is `noindex` (the meta tag on each page plus `X-Robots-Tag` in `_headers`).

## Launch checklist

1. Resolve every `TODO(launch)` placeholder, including the FAQ answers marked `[APG to confirm: …]`. The founder should review `faq.html`.
2. Remove `<meta name="robots" content="noindex, nofollow">` from `index`, `about`, `updates`, `join`, `faq` and `contact` (keep it on `404.html`).
3. In `_headers`, remove the `X-Robots-Tag` line under `/*`. Keep the `pages.dev` rules so preview copies stay out of search.
4. Add the `autismga.org` custom domain to the Pages project.
5. Add 301 redirects in a `_redirects` file for any old autismga.org URLs that don't exist here.
6. In Cloudflare, under **AI Crawl Control**, turn off "Block AI bots" and the managed robots.txt for autismga.org. Cloudflare blocks AI crawlers by default on new domains, which would undo the AI visibility work.
7. Verify the domain in Google Search Console (DNS TXT record in Cloudflare) and submit `https://autismga.org/sitemap.xml`. Then import the site into Bing Webmaster Tools from Search Console (Bing also feeds ChatGPT and Copilot search).
8. Check the home page and FAQ with Google's Rich Results Test.
