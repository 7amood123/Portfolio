import { useLayoutEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { getGsap } from '@/utils/motion'

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const element = ref.current
    if (!element || reduced) return
    try {
      const { gsap } = getGsap()
      const context = gsap.context(() => {
        gsap.from(element, {
          y: 18,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: element,
            start: 'top 92%',
            once: true,
          },
        })
      }, element)
      return () => context.revert()
    } catch {
      return
    }
  }, [reduced])

  return ref
}
