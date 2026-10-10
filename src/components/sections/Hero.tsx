import { useTranslation } from 'react-i18next'
import { InteractiveDevice } from '@/components/device/InteractiveDevice'
import { profile } from '@/data/profile'
import { buttonClass } from '@/components/ui/buttonClass'

export function Hero({ portrait = false }: { portrait?: boolean }) {
  const { t } = useTranslation()

  return (
    <header
      id="hero"
      aria-labelledby="hero-title"
      className="pt-20 pb-10 min-[380px]:pt-24 sm:pt-28 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-x-10 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-28"
    >
      <div className="min-w-0 md:col-start-1 md:row-start-1">
        <p className="text-xs font-medium tracking-[0.2em] text-violet uppercase">
          <span>{t('hero.role')}</span>
          <span aria-hidden="true"> · </span>
          <span className="text-muted">{t('common.location')}</span>
        </p>
        <h1 id="hero-title" translate="no" className="mt-4 text-[2.3rem] font-medium text-balance min-[380px]:mt-5 min-[380px]:text-[2.7rem] sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-lg text-xl leading-snug min-[380px]:mt-6 text-pretty text-text sm:text-2xl">{t('hero.headline')}</p>
        <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed min-[380px]:mt-5 min-[380px]:text-base text-pretty text-muted">{t('hero.description')}</p>
        <div className="mt-6 flex flex-wrap gap-3 min-[380px]:mt-8">
          <a href="#work" className={buttonClass('primary')}>
            {t('hero.ctaWork')}
          </a>
          <a href="#contact" className={buttonClass('secondary')}>
            {t('hero.ctaContact')}
          </a>
        </div>
      </div>
      {/* Below the large breakpoint the phone is a compact, in-flow element: it never floats over the text. */}
      <div
        data-mobile-phone={portrait ? undefined : 'hero'}
        className={
          portrait
            ? 'device-compact mt-10 md:col-start-2 md:row-start-1 md:mt-0 lg:mt-12'
            : 'device-compact mt-10 md:col-start-2 md:row-start-1 md:mt-0 lg:hidden'
        }
      >
        <InteractiveDevice screen="portrait" />
      </div>
      <a
        href="#work"
        className="mt-8 inline-flex items-center gap-3 text-xs tracking-[0.16em] text-muted uppercase md:col-span-2 md:row-start-2 md:justify-self-start lg:mt-12"
      >
        <span className="scroll-line" aria-hidden="true" />
        {t('hero.scroll')}
      </a>
    </header>
  )
}
