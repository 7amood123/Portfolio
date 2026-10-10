import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'

export function LanguageSwitch() {
  const { i18n, t } = useTranslation()
  const language = i18n.resolvedLanguage ?? i18n.language

  return (
    <div role="group" aria-label={t('nav.language')} className="flex items-center">
      <button
        type="button"
        lang="en"
        aria-label="English"
        aria-pressed={language === 'en'}
        onClick={() => {
          void i18n.changeLanguage('en')
        }}
        className={cn(
          'min-h-11 px-2 text-xs tracking-[0.14em]',
          language === 'en' ? 'text-text underline decoration-violet underline-offset-4' : 'text-muted hover:text-text',
        )}
      >
        EN
      </button>
      <span aria-hidden="true" className="text-muted">
        /
      </span>
      <button
        type="button"
        lang="tr"
        aria-label="Türkçe"
        aria-pressed={language === 'tr'}
        onClick={() => {
          void i18n.changeLanguage('tr')
        }}
        className={cn(
          'min-h-11 px-2 text-xs tracking-[0.14em]',
          language === 'tr' ? 'text-text underline decoration-violet underline-offset-4' : 'text-muted hover:text-text',
        )}
      >
        TR
      </button>
    </div>
  )
}
