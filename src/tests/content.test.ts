import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import en from '@/i18n/locales/en.json'
import tr from '@/i18n/locales/tr.json'
import { navItems } from '@/data/navigation'
import { profile } from '@/data/profile'
import { screenAssets } from '@/components/device/screenAssets'

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, shape((value as Record<string, unknown>)[key])]),
    )
  }
  return typeof value
}

describe('translations', () => {
  it('keeps English and Turkish structures aligned', () => {
    expect(shape(tr)).toEqual(shape(en))
  })

  it('uses the requested public lines', () => {
    expect(en.work.title).toBe('Selected Work')
    expect(tr.work.title).toBe('Öne Çıkan Projeler')
    expect(en.contact.title).toBe("Let's Build Something Meaningful.")
    expect(tr.contact.title).toBe('Birlikte Değerli Bir Şeyler Üretelim.')
    expect(en.hero.headline).toBe('Building thoughtful software for real-world problems.')
    expect(en.about.title).toBe('Beyond the Code')
    expect(en.skills.title).toBe('Tools & Technologies')
  })

  it('does not invent clinical proof, awards, or a phone number', () => {
    const english = JSON.stringify(en)
    const turkish = JSON.stringify(tr)
    expect(english).toContain('not clinically validated')
    expect(english).toContain('does not claim a placement or award')
    expect(english).toContain('not presented as finished features')
    expect(turkish).toContain('ödül iddia etmez')
    expect(english.toLowerCase()).not.toContain('world-class')
    expect(english.toLowerCase()).not.toContain('visionary')
    expect(english).not.toContain('tel:')
    expect(turkish).not.toContain('tel:')
  })
})

describe('profile', () => {
  it('uses the verified contact links and resolves the bundled portrait file', () => {
    expect(profile.email).toBe('mo.abughazala@gmail.com')
    expect(profile.github).toBe('https://github.com/7amood123')
    expect(profile.linkedin).toBe('https://www.linkedin.com/in/mohammed-abughazala-810007257/')
    expect(navItems.map((item) => item.id)).not.toContain('experience')
    expect(screenAssets.profile).toEqual(expect.stringMatching(/profile.*\.jpg$/))
  })

  it('matches the static metadata to the same public identity', () => {
    const html = readFileSync('index.html', 'utf8')
    expect(html).toContain(profile.email)
    expect(html).toContain(profile.github)
    expect(html).toContain(profile.linkedin)
    expect(html).not.toContain('rel="canonical"')
  })
})
