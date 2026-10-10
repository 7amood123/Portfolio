import { useTranslation } from 'react-i18next'
import { InteractiveDevice } from '@/components/device/InteractiveDevice'
import type { ScreenId } from '@/components/device/deviceMotion'
import { useReveal } from '@/hooks/useReveal'
import type { ProjectMeta } from '@/data/projects'
import { formatPeriod } from '@/utils/dates'
import { asStringList } from '@/utils/lists'
import { cn } from '@/utils/cn'

const projectScreens: Record<ProjectMeta['id'], ScreenId> = {
  finance: 'finance',
  soulspace: 'soulspace',
  teknofest: 'teknofest',
}

export function ProjectShowcase({
  project,
  staticDevice = false,
}: {
  project: ProjectMeta
  staticDevice?: boolean
}) {
  const { t, i18n } = useTranslation()
  const ref = useReveal<HTMLElement>()
  const base = `projects.${project.id}`
  const period = formatPeriod(project.start, project.end, i18n.language, t('work.present'))
  const challenges = asStringList(t(`${base}.challenges`, { returnObjects: true }))

  return (
    <article
      ref={ref}
      id={`project-${project.id}`}
      aria-labelledby={`${project.id}-title`}
      className="scroll-mt-64 py-12 lg:min-h-[72vh] lg:scroll-mt-28 lg:py-16"
    >
      {staticDevice ? (
        <div className="mb-8">
          <InteractiveDevice screen={projectScreens[project.id]} />
          <p className="mt-3 text-center text-xs text-muted">
            {t('work.conceptual')} · {t('work.fictionalData')}
          </p>
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-xs font-medium tracking-[0.18em] text-violet uppercase">{project.index}</p>
        <p className="text-sm text-muted">{t(`${base}.category`)}</p>
        <p className="rounded-full border border-border px-3 py-1 text-xs text-text sm:ml-auto">{t(`${base}.status`)}</p>
      </div>
      <h3 id={`${project.id}-title`} className="mt-5 text-3xl text-balance sm:text-4xl">
        {t(`${base}.title`)}
      </h3>
      <p className="mt-3 text-sm text-muted">
        <span className="sr-only">{t('work.timeline')}: </span>
        {period}
      </p>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-muted">{t(`${base}.description`)}</p>
      {project.id === 'soulspace' ? <SoulSpaceNotes /> : null}
      {project.id === 'teknofest' ? <TeknoFestNotes /> : null}
      {project.id === 'finance' ? <FinanceDetails /> : (
        <div className="mt-8 max-w-2xl">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">{t('work.technologies')}</p>
          <TechChips items={asStringList(t(`${base}.technologies`, { returnObjects: true }))} />
        </div>
      )}
      <DetailGrid contribution={t(`${base}.contribution`)} challenges={challenges} className="mt-8 max-w-3xl" />
    </article>
  )
}

function DetailGrid({
  contribution,
  challenges,
  className,
}: {
  contribution: string
  challenges: string[]
  className?: string
}) {
  const { t } = useTranslation()
  return (
    <div className={cn('grid gap-6 sm:grid-cols-2', className)}>
      <div>
        <h4 className="text-xs tracking-[0.16em] text-muted uppercase">{t('work.contribution')}</h4>
        <p className="mt-3 text-sm leading-relaxed text-pretty text-text">{contribution}</p>
      </div>
      <div>
        <h4 className="text-xs tracking-[0.16em] text-muted uppercase">{t('work.challenges')}</h4>
        <ul className="mt-3 space-y-2">
          {challenges.map((item) => (
            <li
              key={item}
              className="relative pl-4 text-sm leading-relaxed text-text before:absolute before:top-2 before:left-0 before:size-1 before:rounded-full before:bg-violet"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function FinanceDetails() {
  const { t } = useTranslation()
  const features = asStringList(t('projects.finance.features', { returnObjects: true }))
  const groups = ['stackWeb', 'stackMobile', 'stackAlso'] as const
  return (
    <div className="mt-8 max-w-3xl">
      <p className="text-xs tracking-[0.16em] text-muted uppercase">{t('work.productDirection')}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t('projects.finance.visionNote')}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {features.map((feature) => (
          <li key={feature} className="text-sm text-text">
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-8 space-y-4">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">{t('work.technologies')}</p>
        {groups.map((group) => (
          <div key={group}>
            <p className="text-xs text-muted">{t(`projects.finance.${group}`)}</p>
            <TechChips items={asStringList(t(`projects.finance.${group}Items`, { returnObjects: true }))} />
          </div>
        ))}
      </div>
    </div>
  )
}

function TechChips({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full border border-border px-2.5 py-1 text-xs text-text">
          {item}
        </li>
      ))}
    </ul>
  )
}

function SoulSpaceNotes() {
  const { t } = useTranslation()
  const milestones = asStringList(t('projects.soulspace.milestones', { returnObjects: true }))
  return (
    <>
      <aside className="mt-6 max-w-2xl border-l border-violet/40 pl-4 text-sm leading-relaxed text-muted">
        {t('projects.soulspace.disclaimer')}
      </aside>
      <ul className="mt-5 space-y-2">
        {milestones.map((item) => (
          <li key={item} className="text-sm text-text">
            {item}
          </li>
        ))}
      </ul>
    </>
  )
}

function TeknoFestNotes() {
  const { t } = useTranslation()
  return (
    <>
      <p className="mt-6 text-sm text-text">{t('projects.teknofest.result')}</p>
      <p className="mt-2 text-sm text-muted">{t('projects.teknofest.resultNote')}</p>
    </>
  )
}
