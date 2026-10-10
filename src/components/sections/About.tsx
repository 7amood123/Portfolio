import { useTranslation } from 'react-i18next'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useReveal } from '@/hooks/useReveal'
import { asStringList } from '@/utils/lists'

export function About() {
  const { t } = useTranslation()
  const ref = useReveal<HTMLDivElement>()
  const paragraphs = asStringList(t('about.paragraphs', { returnObjects: true }))
  const focus = asStringList(t('about.focus', { returnObjects: true }))

  return (
    <Section id="about" labelledBy="about-title" embedded>
      <div ref={ref} className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
        <div>
          <SectionHeading index="02" id="about-title" title={t('about.title')} />
          <div className="mt-8 max-w-xl space-y-5">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-pretty text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <aside className="border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-2 lg:pl-12">
          <p className="text-xs tracking-[0.18em] text-violet uppercase">{t('about.focusTitle')}</p>
          <ul className="mt-6 space-y-3">
            {focus.map((item) => (
              <li key={item} className="font-display text-2xl text-text">
                {item}
              </li>
            ))}
          </ul>
          <dl className="mt-10 space-y-4 text-sm">
            <div>
              <dt className="text-muted">{t('about.basedLabel')}</dt>
              <dd className="mt-1 text-text">{t('common.location')}</dd>
            </div>
            <div>
              <dt className="text-muted">{t('about.graduatedLabel')}</dt>
              <dd className="mt-1 text-text">{t('about.graduatedValue')}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  )
}
