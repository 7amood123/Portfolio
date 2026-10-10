import { useTranslation } from 'react-i18next'
import { InteractiveDevice } from '@/components/device/InteractiveDevice'
import { profile } from '@/data/profile'
import { buttonClass } from '@/components/ui/buttonClass'

export function Hero({ portrait = false }: { portrait?: boolean }) {
  const { t } = useTranslation()

  return (
    <header id="hero" aria-labelledby="hero-title" className="pt-28 pb-10 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-28">
      <p className="text-xs font-medium tracking-[0.2em] text-violet uppercase">
        <span>{t('hero.role')}</span>
        <span aria-hidden="true"> · </span>
        <span className="text-muted">{t('common.location')}</span>
      </p>
      <h1 id="hero-title" translate="no" className="mt-5 text-[2.7rem] font-medium text-balance sm:text-6xl lg:text-7xl">
        {profile.name}
      </h1>
      <p className="mt-6 max-w-lg text-xl leading-snug text-pretty text-text sm:text-2xl">{t('hero.headline')}</p>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted">{t('hero.description')}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#work" className={buttonClass('primary')}>
          {t('hero.ctaWork')}
        </a>
        <a href="#contact" className={buttonClass('secondary')}>
          {t('hero.ctaContact')}
        </a>
      </div>
      {portrait ? (
        <div className="mt-12">
          <InteractiveDevice screen="portrait" />
        </div>
      ) : null}
      <a href="#work" className="mt-8 inline-flex items-center gap-3 text-xs tracking-[0.16em] text-muted uppercase lg:mt-12">
        <span className="scroll-line" aria-hidden="true" />
        {t('hero.scroll')}
      </a>
    </header>
  )
}