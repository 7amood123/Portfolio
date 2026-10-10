import { useLayoutEffect, type RefObject } from 'react'
import type { DeviceBundle } from '@/components/device/InteractiveDevice'
import { devicePose, screenIds, screenPoses, type Markers } from '@/components/device/deviceMotion'
import { getGsap } from '@/utils/motion'

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}

function markerAt(journey: HTMLElement, id: string, total: number) {
  const element = document.getElementById(id)
  if (!element) return 0
  const journeyTop = journey.getBoundingClientRect().top + window.scrollY
  const top = element.getBoundingClientRect().top + window.scrollY
  return clamp((top - journeyTop) / total)
}

function readMarkers(journey: HTMLElement): Markers {
  const total = Math.max(journey.offsetHeight - window.innerHeight, 1)
  const skills = document.getElementById('skills')
  const skillsStart = markerAt(journey, 'skills', total)
  const journeyTop = journey.getBoundingClientRect().top + window.scrollY
  const skillsEnd = skills
    ? clamp((skills.getBoundingClientRect().top + window.scrollY + skills.offsetHeight - journeyTop) / total)
    : 1
  return {
    finance: markerAt(journey, 'project-finance', total),
    soulspace: markerAt(journey, 'project-soulspace', total),
    teknofest: markerAt(journey, 'project-teknofest', total),
    about: markerAt(journey, 'about', total),
    skills: skillsStart,
    skillsEnd,
  }
}

function paint(bundle: DeviceBundle | null, progress: number, markers: Markers, desktop: boolean) {
  if (!bundle?.tilt || !bundle.scene) return
  const { gsap } = getGsap()
  const pose = devicePose(progress, markers, desktop)
  gsap.set(bundle.tilt, {
    rotateY: pose.rotateY,
    rotateX: pose.rotateX,
    scale: pose.scale,
    x: pose.x,
    transformPerspective: 900,
  })
  gsap.set(bundle.scene, { opacity: pose.opacity })
  const layers = screenPoses(progress, markers)
  for (const id of screenIds) {
    const layer = bundle.screens[id]
    if (!layer) continue
    const frame = layers[id]
    gsap.set(layer, { opacity: frame.opacity, y: frame.y })
  }
}

export function useDeviceScroll({
  journeyRef,
  desktopRef,
  mobileRef,
  mobileHostRef,
  enabled,
  language,
}: {
  journeyRef: RefObject<HTMLElement | null>
  desktopRef: RefObject<DeviceBundle | null>
  mobileRef: RefObject<DeviceBundle | null>
  mobileHostRef: RefObject<HTMLDivElement | null>
  enabled: boolean
  language: string
}) {
  useLayoutEffect(() => {
    const journey = journeyRef.current
    if (!journey || !enabled) return

    try {
      const { gsap, ScrollTrigger } = getGsap()
      const context = gsap.context(() => {
        const media = gsap.matchMedia()

        const mount = (desktop: boolean) => {
          const bundle = () => (desktop ? desktopRef.current : mobileRef.current)
          let markers = readMarkers(journey)
          const scene = bundle()?.scene
          if (scene) {
            gsap.from(scene, {
              y: 28,
              duration: 0.85,
              ease: 'power2.out',
              delay: 0.06,
              clearProps: 'transform',
            })
          }

          ScrollTrigger.create({
            trigger: journey,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.45,
            invalidateOnRefresh: true,
            onRefresh: () => {
              markers = readMarkers(journey)
            },
            onUpdate: (self) => {
              paint(bundle(), self.progress, markers, desktop)
              const host = mobileHostRef.current
              if (!host || desktop) return
              host.classList.toggle('is-resting', devicePose(self.progress, markers, false).opacity < 0.05)
            },
          })
        }

        media.add('(min-width: 1024px)', () => mount(true))
        media.add('(max-width: 1023px)', () => mount(false))
      }, journey)

      return () => context.revert()
    } catch {
      return
    }
  }, [desktopRef, enabled, journeyRef, language, mobileHostRef, mobileRef])
}
