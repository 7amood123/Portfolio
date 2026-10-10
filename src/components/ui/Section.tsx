import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export function Section({
  id,
  labelledBy,
  children,
  className,
  embedded = false,
}: {
  id: string
  labelledBy: string
  children: ReactNode
  className?: string
  embedded?: boolean
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('scroll-mt-24 overflow-x-clip border-t border-border py-20 sm:py-28', className)}
    >
      {embedded ? children : <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">{children}</div>}
    </section>
  )
}
