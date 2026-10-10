# Implementation report

The portfolio is a static single-page site. This revision replaces the 3D figure with one scroll-driven phone and removes the standalone experience section. It has not been deployed.

## What changed

The page order is now Hero, Selected Work, About, Tools & Technologies, Education and Highlights, Contact, Footer. The Experience link, timeline, and section are gone. Dev Secure and Macellan work stay in Other Engineering Work, and the project write-ups are unchanged. There was no downloadable CV in the project.

The phone is one CSS 3D object, not a WebGL scene. Three.js, React Three Fiber, and drei are no longer dependencies. GSAP ScrollTrigger scrubs the phone’s rotation, scale, and screen from scroll position, in both directions. React state is not updated on each frame.

Screen order:

1. Hero: initials MA until `public/images/profile.jpg` exists. A missing photo is not requested.
2. Personal Finance Tracker: fictional dashboard, or `public/images/projects/finance-tracker.png` if that file is present.
3. SoulSpace: conceptual chat.
4. TeknoFest PPG analyzer: fictional waveform and reading. The page still says this is not a medical measurement and does not claim an award.
5. About and skills: a short code-editor screen, then the phone fades out before education.

On a wide screen the phone stays in a column beside the text. On a narrow screen it sits under the introduction and stays above the project text while Selected Work is in view. Reduced motion turns the scrub off and shows a static phone in the hero and on each project.

English and Turkish still switch in place and are stored in `localStorage` under `ma-lang`.

## Libraries

React 19, TypeScript 6, Vite 8, Tailwind CSS 4, GSAP 3, i18next 26, react-i18next 17, lucide-react, the variable Inter and Space Grotesk fonts, Vitest 5, Testing Library, and Playwright 1.

## Tests that were run

| Check | Result |
| --- | --- |
| `npm test` | 4 files, 14 tests passed |
| `npm run lint` | Passed |
| `npm run build` | Passed. Output is `dist/` |
| `npm run test:e2e` | 11 passed, 7 skipped |

The skips are intentional. Language, link, scroll, and reduced-motion checks run on the desktop project. The compact menu runs on tablet and mobile. Overflow and screenshots run on all three viewports (1440×900, 768×1024, and Pixel 5).

The browser checks covered the section headings, the removed experience link, anchor navigation, contact links, Turkish text after reload, no request for a missing portrait, scroll into SoulSpace and back to the portrait, no horizontal overflow, the compact menu, and reduced motion without a canvas.

Lighthouse was not run. No score is claimed.

## Bundle

The production script is one file of about 432 KB (about 143 KB gzip). The previous Three.js scene chunk is gone.

## Known limitations

- The portrait is initials until a photo is added. See `docs/DEVICE.md`.
- Project screens are conceptual mockups until optional screenshots are added. Finance features that could not be verified stay labeled as product direction.
- No production domain is set. Canonical, Open Graph image, and sitemap tags are added only when `VITE_SITE_URL` is a real origin.
- Language is client-side only. There are no separate `/en` and `/tr` URLs.
- On a phone, the device is large while Selected Work is on screen so the screen stays readable. It leaves before About.

## Run, build, and deploy

```bash
npm install
npx playwright install chromium
npm run dev
```

```bash
npm run build
npm run preview
```

Upload `dist/`, or use the included Vercel and Netlify config. Set `VITE_SITE_URL` when the domain exists, then rebuild.

## Replace the portrait or a project screen

Add the files listed in `docs/DEVICE.md` and restart the dev server. If a file is missing, the built-in screen stays and the browser is not asked for it.
