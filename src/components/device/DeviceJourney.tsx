import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { InteractiveDevice, type DeviceBundle } from '@/components/device/InteractiveDevice'
import { useDeviceScroll } from '@/components/device/DeviceScrollController'
import { About } from '@/components/sections/About'
import { Hero } from '@/components/sections/Hero'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Skills } from '@/components/sections/Skills'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function DeviceJourney() {
  const reduced = usePrefersReducedMotion()
  const { i18n } = useTranslation()
  const journeyRef = useRef<HTMLDivElement>(null)
  const desktopRef = useRef<DeviceBundle | null>(null)
  const mobileRef = useRef<DeviceBundle | null>(null)
  const mobileHostRef = useRef<HTMLDivElement>(null)

  useDeviceScroll({
    journeyRef,
    desktopRef,
    mobileRef,
    mobileHostRef,
    enabled: !reduced,
    language: i18n.language,
  })

  return (
    <div
      ref={journeyRef}
      className="mx-auto w-full lg:grid lg:max-w-[1180px] lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]"
    >
      <div className="min-w-0 px-5 sm:px-8 lg:pr-4 lg:pl-8">
        <Hero portrait={reduced} />
        <div>
          {reduced ? null : (
            <div ref={mobileHostRef} className="device-mobile sticky top-[4.25rem] z-20 bg-bg py-2 lg:hidden">
              <InteractiveDevice bundleRef={mobileRef} live />
            </div>
          )}
          <SelectedWork staticDevices={reduced} />
        </div>
        <About />
        <Skills />
      </div>
      <div className="device-rail relative hidden lg:block">
        <div className="sticky top-36 px-4">
          {reduced ? null : <InteractiveDevice bundleRef={desktopRef} live />}
        </div>
      </div>
    </div>
  )
}
