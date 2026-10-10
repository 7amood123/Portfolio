import { useTranslation } from 'react-i18next'
import { skillGroupIds } from '@/data/skills'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useReveal } from '@/hooks/useReveal'
import { asStringList } from '@/utils/lists'

export function Skills() {
  const { t } = useTranslation()
  const ref = useReveal<HTMLDivElement>()

  return (
    <Section id="skills" labelledBy="skills-title" embedded>
      <div ref={ref}>
        <SectionHeading index="03" id="skills-title" title={t('skills.title')} subtitle={t('skills.intro')} />
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {skillGroupIds.map((id) => {
            const items = asStringList(t(`skills.groups.${id}.items`, { returnObjects: true }))
            return (
              <section key={id} aria-labelledby={`skill-${id}`}>
                <h3 id={`skill-${id}`} className="text-xl text-text">
                  {t(`skills.groups.${id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(`skills.groups.${id}.note`)}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-3 py-1.5 text-sm text-text transition-colors hover:border-violet/40"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
