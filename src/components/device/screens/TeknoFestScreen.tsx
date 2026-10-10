import { useTranslation } from 'react-i18next'
import { screenAssets } from '@/components/device/screenAssets'
import { buildPulsePath } from '@/utils/waveform'

export function TeknoFestScreen() {
  const { t } = useTranslation()
  if (screenAssets.teknofest) {
    return <img src={screenAssets.teknofest} alt="" className="h-full w-full object-cover object-top" />
  }

  const wave = buildPulsePath(220, 72, 3)

  return (
    <div className="flex h-full flex-col px-3.5 pt-8 pb-4">
      <p className="text-[10px] tracking-[0.14em] text-violet uppercase">{t('projects.teknofest.waveLabel')}</p>
      <p className="mt-4 font-display text-5xl text-text">
        {t('projects.teknofest.readingValue')}
        <span className="ml-1 text-sm text-muted">{t('projects.teknofest.bpm')}</span>
      </p>
      <p className="mt-1 text-[10px] text-muted">{t('projects.teknofest.sampleReading')}</p>
      <div className="mt-5 rounded-2xl bg-[#1c1826] px-2 py-3">
        <svg viewBox="0 0 220 72" className="h-[4.5rem] w-full" aria-hidden="true">
          <path d={wave} fill="none" stroke="#c4b5fd" strokeWidth="2" />
        </svg>
      </div>
      <p className="mt-4 text-[10px] leading-relaxed text-muted">{t('work.notMedical')}</p>
    </div>
  )
}
