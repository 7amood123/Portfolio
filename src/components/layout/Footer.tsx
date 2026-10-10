import { useTranslation } from 'react-i18next'
import { profile } from '@/data/profile'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-lg text-text" translate="no">
            {profile.name}
          </p>
          <p className="text-sm text-muted">
            {t('hero.role')} · {t('common.location')}
          </p>
        </div>
        <p className="text-sm text-muted">
          © {year} <span translate="no">{profile.name}</span>
        </p>
        <a href="#hero" className="text-sm text-muted hover:text-text">
          {t('a11y.backToTop')}
        </a>
      </div>
    </footer>
  )
}
