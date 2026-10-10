import { useLayoutEffect, type RefObject } from 'react'
import type { DeviceBundle } from '@/components/device/InteractiveDevice'
import {
  compactPose,
  devicePose,
  heroTilt,
  screenIds,
  screenPoses,
  type Markers,
  previousScreens,
  type ProjectId,
} from '@/components/device/deviceMotion'
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

function paint(bundle: DeviceBundle | null, progress: number, markers: Markers) {
  if (!bundle?.tilt || !bundle.scene) return
  const { gsap } = getGsap()
  const pose = devicePose(progress, markers, true)
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

/**
 * Narrow screens: every phone sits in normal flow, so nothing is pinned and nothing can cover text.
 * Each phone gets its own small ScrollTrigger while it travels up the viewport.
 */
function mountCompact(journey: HTMLElement) {
  const { gsap, ScrollTrigger } = getGsap()
  const phones = journey.querySelectorAll<HTMLElement>('[data-mobile-phone]')

  phones.forEach((phone) => {
    const id = phone.dataset.mobilePhone ?? ''
    const tilt = phone.querySelector<HTMLElement>('.device-tilt')
    if (!tilt) return

    if (id === 'hero') {
      gsap.set(tilt, { transformPerspective: 900, ...heroTilt(0) })
      ScrollTrigger.create({
        trigger: phone,
        start: 'top 85%',
        end: 'bottom 15%',
        scrub: 0.3,
        onUpdate: (self) => gsap.set(tilt, { ...heroTilt(self.progress) }),
      })
      return
    }

    const previousLayer = phone.querySelector<HTMLElement>(`[data-screen="${previousScreens[id as ProjectId]}"]`)
    const currentLayer = phone.querySelector<HTMLElement>(`[data-screen="${id}"]`)
    if (!previousLayer || !currentLayer) return

    const paintCompact = (progress: number) => {
      const pose = compactPose(progress)
      gsap.set(tilt, { rotateY: pose.rotateY, rotateX: pose.rotateX, transformPerspective: 900 })
      gsap.set(previousLayer, { opacity: pose.previous.opacity, y: pose.previous.y })
      gsap.set(currentLayer, { opacity: pose.current.opacity, y: pose.current.y })
    }
    paintCompact(0)
    ScrollTrigger.create({
      trigger: phone,
      start: 'top 90%',
      end: 'top 35%',
      scrub: 0.3,
      onUpdate: (self) => paintCompact(self.progress),
    })
  })
}

export function useDeviceScroll({
  journeyRef,
  desktopRef,
  enabled,
  language,
}: {
  journeyRef: RefObject<HTMLElement | null>
  desktopRef: RefObject<DeviceBundle | null>
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

        // Desktop: one pinned phone in the side rail, driven by the whole journey.
        media.add('(min-width: 1024px)', () => {
          let markers = readMarkers(journey)
          const scene = desktopRef.current?.scene
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
            onUpdate: (self) => paint(desktopRef.current, self.progress, markers),
          })
        })

        // Mobile and tablet: compact in-flow phones with their own light scroll effects.
        media.add('(max-width: 1023px)', () => mountCompact(journey))
      }, journey)

      return () => context.revert()
    } catch {
      return
    }
  }, [desktopRef, enabled, journeyRef, language])
}