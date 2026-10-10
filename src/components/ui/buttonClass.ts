import { cn } from '@/utils/cn'

export function buttonClass(variant: 'primary' | 'secondary' = 'primary', className?: string) {
  return cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium tracking-wide transition-colors',
    variant === 'primary'
      ? 'bg-purple-deep text-white hover:bg-purple-hover'
      : 'border border-border bg-transparent text-text hover:border-violet/50',
    className,
  )
}
