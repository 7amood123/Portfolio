import { useTranslation } from 'react-i18next'
import { educationPeriod } from '@/data/education'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useReveal } from '@/hooks/useReveal'
import { formatPeriod } from '@/utils/dates'
import { asStringList } from '@/utils/lists'

export function Education() {
  const { t, i18n } = useTranslation()
  const ref = useReveal<HTMLDivElement>()
  const highlights = asStringList(t('education.highlights', { returnObjects: true }))
  const languages = asStringList(t('education.languages', { returnObjects: true }))
  const period = formatPeriod(educationPeriod.start, educationPeriod.end, i18n.language, t('work.present'))

  return (
    <Section id="education" labelledBy="education-title">
      <div ref={ref}>
        <SectionHeading index="04" id="education-title" title={t('education.title')} />
        <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h3 className="text-2xl text-text">{t('education.degree')}</h3>
            <p className="mt-3 text-text">{t('education.school')}</p>
            <p className="mt-2 text-sm text-muted">{period}</p>
            <p className="mt-1 text-sm text-muted">{t('common.location')}</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-lg text-text">{t('education.highlightsTitle')}</h3>
              <ul className="mt-4 space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg text-text">{t('education.languagesTitle')}</h3>
              <ul className="mt-4 space-y-3">
                {languages.map((item) => (
                  <li key={item} className="text-sm text-text">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
