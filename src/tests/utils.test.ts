import { describe, expect, it } from 'vitest'
import { buildAreaPath, buildLinePath } from '@/utils/chart'
import { formatMonth, formatPeriod } from '@/utils/dates'
import { resolveInitialLanguage } from '@/utils/language'
import { buildPulsePath } from '@/utils/waveform'

describe('dates', () => {
  it('formats months without shifting across time zones', () => {
    expect(formatMonth('2025-09', 'en')).toBe('September 2025')
    expect(formatMonth('2025-09', 'tr')).toBe('Eylül 2025')
    expect(formatPeriod('2025-09', null, 'en', 'Present')).toBe('September 2025 – Present')
  })
})

describe('language selection', () => {
  it('uses a saved choice before the browser language', () => {
    localStorage.clear()
    expect(resolveInitialLanguage(localStorage, ['tr-TR', 'tr'])).toBe('tr')
    localStorage.setItem('ma-lang', 'en')
    expect(resolveInitialLanguage(localStorage, ['tr-TR'])).toBe('en')
    localStorage.setItem('ma-lang', 'tr')
    expect(resolveInitialLanguage(localStorage, ['en-US'])).toBe('tr')
    localStorage.clear()
    expect(resolveInitialLanguage(localStorage, ['en-US'])).toBe('en')
    expect(resolveInitialLanguage(localStorage, [])).toBe('en')
  })
})

describe('visual paths', () => {
  it('builds chart and pulse paths', () => {
    expect(buildLinePath([1, 3, 2], 100, 40).startsWith('M')).toBe(true)
    expect(buildAreaPath([1, 3, 2], 100, 40)).toContain('Z')
    expect(buildPulsePath(200, 60).startsWith('M')).toBe(true)
    expect(buildLinePath([], 10, 10)).toBe('')
  })
})
