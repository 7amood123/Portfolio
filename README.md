# Mohammed Abughazala

Personal portfolio for Mohammed Abughazala, a software engineer based in Istanbul. The site is a single scrolling page with English and Turkish, a restrained black-and-purple design, and one scroll-driven phone that changes screens as the page moves.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually `http://127.0.0.1:5173`.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

Playwright needs Chromium once:

```bash
npx playwright install chromium
```

## Production build

```bash
npm run build
```

The static site is written to `dist/`. Preview it with:

```bash
npm run preview
```

No backend and no server-side rendering are required.

## Environment

Copy `.env.example` to `.env` when you have a real domain.

- `VITE_SITE_URL` — absolute public URL, no trailing slash, for the canonical URL, Open Graph image, and sitemap. Defaults to `https://7amood123.github.io/Portfolio`. Set it to an empty value to omit these tags.
- `VITE_BASE` — public base path. Defaults to `/Portfolio/` for GitHub Pages (the repository name is case-sensitive). Use `/` for a normal host.

Language is switched in the browser and stored in `localStorage`. There are no separate `/en` and `/tr` URLs, so the site does not advertise alternate language URLs to search engines. The HTML metadata defaults to English. The visible copy updates after JavaScript runs.

## Deploy

Upload the contents of `dist/`, or connect the repository to a static host.

- **Vercel:** the included `vercel.json` sets the build command and `dist` output. Framework preset can be Vite.
- **Netlify:** `netlify.toml` publishes `dist`.
- **Any static host:** run `npm run build` and upload `dist`.

Set `VITE_SITE_URL` in the host's build environment before building. Do not deploy from this repository automatically; hosting credentials are intentionally not configured.

## Device screens

The phone is CSS, not WebGL. A portrait and project screenshots are optional. Instructions are in [docs/DEVICE.md](docs/DEVICE.md).

## Stack

React, TypeScript, Vite, Tailwind CSS, GSAP, i18next, Lucide, Vitest, and Playwright.
