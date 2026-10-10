import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/data/navigation'
import { cn } from '@/utils/cn'
import { LanguageSwitch } from '@/components/layout/LanguageSwitch'

export function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element))
    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.6] },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-colors',
        scrolled || open ? 'border-border bg-bg' : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 overflow-x-clip px-5 sm:px-8">
        <a href="#hero" aria-label={t('nav.home')} className="min-w-0 font-display text-lg tracking-tight text-text">
          Mohammed<span className="text-violet">.</span>
        </a>
        <nav aria-label={t('nav.primary')} className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              className={cn(
                'text-sm underline-offset-8',
                active === item.id ? 'text-text underline decoration-violet' : 'text-muted hover:text-text',
              )}
            >
              {t(item.labelKey)}
            </a>
          ))}
        </nav>
        <div className="relative z-10 flex shrink-0 items-center gap-1">
          <LanguageSwitch />
          <button
            type="button"
            className="relative z-10 inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full text-text lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            <span className="sr-only">{open ? t('nav.closeMenu') : t('nav.openMenu')}</span>
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label={t('nav.mobile')}
        hidden={!open}
        className="border-t border-border lg:hidden"
      >
        <div className="mx-auto flex max-w-[1120px] flex-col px-5 py-2 sm:px-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="border-b border-border py-4 font-display text-2xl text-text"
              onClick={() => setOpen(false)}
            >
              {t(item.labelKey)}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
