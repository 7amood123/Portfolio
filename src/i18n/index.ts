import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import tr from './locales/tr.json'
import {
  browserLanguages,
  persistLanguage,
  resolveInitialLanguage,
  safeLocalStorage,
} from '@/utils/language'

const storage = safeLocalStorage()
const initialLanguage = storage ? resolveInitialLanguage(storage, browserLanguages()) : 'en'

i18n.on('languageChanged', persistLanguage)

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  supportedLngs: ['en', 'tr'],
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
})

persistLanguage(i18n.resolvedLanguage ?? initialLanguage)

export default i18n
