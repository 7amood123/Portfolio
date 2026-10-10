import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { DeviceJourney } from '@/components/device/DeviceJourney'
import { Education } from '@/components/sections/Education'
import { Contact } from '@/components/sections/Contact'
import { prefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { getGsap } from '@/utils/motion'

export function App() {
  const { t } = useTranslation()

  useEffect(() => {
    if (prefersReducedMotion()) return
    try {
      const { ScrollTrigger } = getGsap()
      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh)
      void document.fonts?.ready.then(refresh)
      return () => window.removeEventListener('load', refresh)
    } catch {
      return
    }
  }, [])

  return (
    <div className="bg-bg text-text">
      <a href="#main" className="skip-link">
        {t('a11y.skip')}
      </a>
      <Navbar />
      <main id="main">
        <DeviceJourney />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
