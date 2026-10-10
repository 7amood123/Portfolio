import { mkdirSync } from 'node:fs'
import { expect, test } from '@playwright/test'

test('loads the portfolio, links, and language without a model request', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop')
  const errors: string[] = []
  const urls: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('request', (request) => urls.push(request.url()))

  await page.goto('./')
  await expect(page).toHaveTitle(/Mohammed Abughazala/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mohammed Abughazala')
  await expect(page.getByRole('heading', { name: 'Selected Work' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Beyond the Code' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Tools & Technologies' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Experience' })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Experience' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Education and Highlights' })).toBeVisible()
  await expect(page.getByRole('heading', { name: "Let's Build Something Meaningful." })).toBeVisible()

  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Work' }).click()
  await expect(page).toHaveURL(/#work/)
  await expect(page.locator('#work')).toBeInViewport()

  const github = page.getByRole('link', { name: /github\.com\/7amood123/ })
  await expect(github).toHaveAttribute('href', 'https://github.com/7amood123')
  await expect(github).toHaveAttribute('rel', /noopener/)
  await expect(page.getByRole('link', { name: /mo\.abughazala@gmail\.com/ })).toHaveAttribute(
    'href',
    'mailto:mo.abughazala@gmail.com',
  )
  await expect(page.getByRole('link', { name: /mohammed-abughazala-810007257/ })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/mohammed-abughazala-810007257/',
  )

  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.getByRole('status')).toContainText(/copied/i)

  await page.getByRole('button', { name: 'Türkçe' }).click()
  await expect(page.getByRole('heading', { name: 'Öne Çıkan Projeler' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Öne Çıkan Projeler' })).toBeVisible()
  await page.getByRole('button', { name: 'English' }).click()
  await expect(page.getByRole('heading', { name: 'Selected Work' })).toBeVisible()

  await expect(page.locator('.device-rail img').first()).toHaveAttribute('src', /profile.*\.jpg/)
  expect(urls.some((url) => url.includes('mohammed-avatar.glb'))).toBe(false)
  expect(errors, errors.join('\n')).toEqual([])
})

test('moves the device screen with scroll and reverses it', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop')
  await page.goto('./')
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
  await page.locator('#project-soulspace').evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, top + 280)
  })
  await expect
    .poll(async () =>
      page.locator('.device-rail [data-screen="soulspace"]').evaluate((element) => Number(getComputedStyle(element).opacity)),
    )
    .toBeGreaterThan(0.8)
  await expect(page.locator('.device-rail .device-scene')).toBeInViewport()
  await page.evaluate(() => window.scrollTo(0, 0))
  await expect
    .poll(async () =>
      page.locator('.device-rail [data-screen="portrait"]').evaluate((element) => Number(getComputedStyle(element).opacity)),
    )
    .toBeGreaterThan(0.8)
})

test('has no horizontal overflow', async ({ page }, testInfo) => {
  await page.goto('./')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow, testInfo.project.name).toBeLessThanOrEqual(1)
})

test('opens the compact menu below desktop width', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'desktop')
  await page.goto('./')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Contact' }).click()
  await expect(page.locator('#contact')).toBeInViewport()
})

test('keeps content available with reduced motion', async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop')
  const context = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  })
  const page = await context.newPage()
  await page.goto('./')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mohammed')
  await expect(page.locator('#hero img').first()).toHaveAttribute('src', /profile.*\.jpg/)
  await expect(page.locator('#project-finance')).toContainText('48,250')
  await expect(page.locator('canvas')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Experience' })).toHaveCount(0)
  await context.close()
})

test('captures review screenshots', async ({ page }, testInfo) => {
  mkdirSync('e2e/artifacts', { recursive: true })
  await page.goto('./')
  const scene = testInfo.project.name === 'desktop' ? '.device-rail .device-scene' : '.device-mobile .device-scene'
  await page.locator(scene).waitFor()
  await page.screenshot({ path: `e2e/artifacts/${testInfo.project.name}-top.png` })
  await page.locator('#hero').screenshot({ path: `e2e/artifacts/${testInfo.project.name}-hero.png` })
  await page.locator('#project-finance').evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, top + 160)
  })
  await page.screenshot({ path: `e2e/artifacts/${testInfo.project.name}-finance.png` })
  await page.locator('#work').screenshot({ path: `e2e/artifacts/${testInfo.project.name}-work.png` })
  if (testInfo.project.name !== 'tablet') {
    await page.screenshot({ path: `e2e/artifacts/${testInfo.project.name}-full.png`, fullPage: true })
  }
})
