import { useEffect, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import { profile } from '@/data/profile'
import { Section } from '@/components/ui/Section'
import { buttonClass } from '@/components/ui/buttonClass'
import { useReveal } from '@/hooks/useReveal'

export function Contact() {
  const { t } = useTranslation()
  const ref = useReveal<HTMLDivElement>()
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')

  useEffect(() => {
    if (copyState === 'idle') return
    const timer = window.setTimeout(() => setCopyState('idle'), 2200)
    return () => window.clearTimeout(timer)
  }, [copyState])

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
  }

  const message =
    copyState === 'copied' ? t('a11y.copied') : copyState === 'error' ? t('a11y.copyFailed') : ''

  return (
    <Section id="contact" labelledBy="contact-title" className="relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_68%)]"
      />
      <div ref={ref} className="relative">
        <p className="text-xs font-medium tracking-[0.2em] text-violet uppercase">06</p>
        <h2 id="contact-title" className="mt-3 max-w-3xl text-4xl text-balance sm:text-6xl">
          {t('contact.title')}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{t('contact.body')}</p>
        <div className="mt-12 border-t border-border">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border py-6">
            <a href={`mailto:${profile.email}`} className="min-w-0">
              <span className="flex items-center gap-2 text-xs tracking-[0.16em] text-muted uppercase">
                <Mail size={14} aria-hidden />
                {t('contact.email')}
              </span>
              <span className="mt-2 block font-display text-xl break-all text-text sm:text-2xl" translate="no">
                {profile.email}
              </span>
            </a>
            <div className="flex flex-col items-start gap-2">
              <button type="button" className={buttonClass('secondary')} aria-label={t('a11y.copyEmail')} onClick={() => void onCopy()}>
                {copyState === 'copied' ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                {t('a11y.copy')}
              </button>
              <p role="status" aria-live="polite" className="min-h-5 text-sm text-violet">
                {message}
              </p>
            </div>
          </div>
          <ExternalRow
            href={profile.github}
            label={t('contact.github')}
            value={profile.githubLabel}
            icon={<GithubIcon className="size-4" />}
          />
          <ExternalRow
            href={profile.linkedin}
            label={t('contact.linkedin')}
            value={profile.linkedinLabel}
            icon={<LinkedinIcon className="size-4" />}
          />
        </div>
      </div>
    </Section>
  )
}

function ExternalRow({
  href,
  label,
  value,
  icon,
}: {
  href: string
  label: string
  value: string
  icon: ReactNode
}) {
  const { t } = useTranslation()
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-end justify-between gap-4 border-b border-border py-6"
    >
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-xs tracking-[0.16em] text-muted uppercase">
          {icon}
          {label}
        </span>
        <span className="mt-2 block font-display text-xl break-all text-text sm:text-2xl" translate="no">
          {value}
        </span>
      </span>
      <ArrowUpRight className="mb-1 size-5 shrink-0 text-muted transition-colors group-hover:text-text" aria-hidden />
      <span className="sr-only">{t('a11y.openInNewTab')}</span>
    </a>
  )
}
