import { useTranslation } from 'react-i18next'
import { otherWorkIds, projects } from '@/data/projects'
import { ProjectShowcase } from '@/components/projects/ProjectShowcase'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useReveal } from '@/hooks/useReveal'

export function SelectedWork({ staticDevices = false }: { staticDevices?: boolean }) {
  const { t } = useTranslation()
  const headingRef = useReveal<HTMLDivElement>()
  const otherRef = useReveal<HTMLDivElement>()

  return (
    <Section id="work" labelledBy="work-title" embedded className="scroll-mt-72 lg:scroll-mt-28">
      <div ref={headingRef}>
        <SectionHeading index="01" id="work-title" title={t('work.title')} subtitle={t('work.subtitle')} />
      </div>
      <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
        {projects.map((project) => (
          <ProjectShowcase key={project.id} project={project} staticDevice={staticDevices} />
        ))}
      </div>
      <div ref={otherRef} className="mt-24 border-t border-border pt-14">
        <h3 className="text-2xl sm:text-3xl">{t('other.title')}</h3>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {otherWorkIds.map((id) => (
            <article key={id}>
              <h4 className="text-xl text-text">{t(`other.${id}.title`)}</h4>
              <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">{t(`other.${id}.body`)}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
