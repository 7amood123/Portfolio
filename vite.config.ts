import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import type { Plugin } from 'vite'

function siteOrigin() {
  const raw = process.env.VITE_SITE_URL?.trim()
  if (!raw) return ''
  try {
    const url = new URL(raw)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return ''
    return url.origin
  } catch {
    return ''
  }
}

function seoFilesPlugin(): Plugin {
  return {
    name: 'portfolio-seo-files',
    apply: 'build',
    transformIndexHtml(html) {
      const site = siteOrigin()
      if (!site) return html
      const tags = [
        `<link rel="canonical" href="${site}/" />`,
        `<meta property="og:url" content="${site}/" />`,
        `<meta property="og:image" content="${site}/og.png" />`,
        `<meta name="twitter:image" content="${site}/og.png" />`,
      ].join('\n    ')
      return html
        .replace('name="twitter:card" content="summary"', 'name="twitter:card" content="summary_large_image"')
        .replace('</head>', `    ${tags}\n  </head>`)
    },
    closeBundle() {
      const site = siteOrigin()
      const dist = resolve(process.cwd(), 'dist')
      mkdirSync(dist, { recursive: true })
      if (!site) {
        writeFileSync(resolve(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n')
        return
      }
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
      writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)
      writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`)
    },
  }
}

// GitHub Pages project site: https://7amood123.github.io/portfolio/
const base = process.env.VITE_BASE && process.env.VITE_BASE.startsWith('/') ? process.env.VITE_BASE : '/portfolio/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), seoFilesPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    css: false,
  },
})
