export const LANGUAGE_STORAGE_KEY = 'ma-lang'

export function browserLanguages(): readonly string[] {
  if (typeof navigator === 'undefined') return []
  if (navigator.languages?.length) return navigator.languages
  return navigator.language ? [navigator.language] : []
}

export function safeLocalStorage(): Storage | null {
  try {
    if (typeof window === 'undefined') return null
    return window.localStorage
  } catch {
    return null
  }
}

export function persistLanguage(language: string) {
  const storage = safeLocalStorage()
  if (!storage) return
  if (language === 'en' || language === 'tr') storage.setItem(LANGUAGE_STORAGE_KEY, language)
}

export function resolveInitialLanguage(
  storage: Pick<Storage, 'getItem'>,
  languages: readonly string[],
): 'en' | 'tr' {
  const stored = storage.getItem(LANGUAGE_STORAGE_KEY)
  if (stored === 'en' || stored === 'tr') return stored
  const prefersTurkish = languages.some((code) => code.toLowerCase().startsWith('tr'))
  return prefersTurkish ? 'tr' : 'en'
}
