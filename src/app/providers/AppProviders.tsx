import { useEffect, type ReactNode } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import i18n from '@/i18n'

function setMeta(selector: string, content: string) {
  const element = document.head.querySelector(selector)
  if (element) element.setAttribute('content', content)
}

function DocumentLanguage() {
  const { t, i18n: instance } = useTranslation()

  useEffect(() => {
    const language = instance.resolvedLanguage ?? instance.language
    document.documentElement.lang = language
    document.title = t('meta.title')
    setMeta('meta[name="description"]', t('meta.description'))
    setMeta('meta[property="og:title"]', t('meta.title'))
    setMeta('meta[property="og:description"]', t('meta.description'))
    setMeta('meta[name="twitter:title"]', t('meta.title'))
    setMeta('meta[name="twitter:description"]', t('meta.description'))
    setMeta('meta[property="og:locale"]', language === 'tr' ? 'tr_TR' : 'en_US')
  }, [instance.language, instance.resolvedLanguage, t])

  return null
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <DocumentLanguage />
      {children}
    </I18nextProvider>
  )
}
