import { profile } from '@/data/profile'
import { useTranslation } from 'react-i18next'

export function DeviceFallback() {
  const { t } = useTranslation()

  return (
    <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_28%,rgba(139,92,246,0.32),transparent_58%),#14121c] px-6 text-center">
      <p className="font-display text-5xl tracking-tight text-text">{t('device.initials')}</p>
      <p className="mt-4 text-sm text-muted" translate="no">
        {profile.name}
      </p>
    </div>
  )
}
