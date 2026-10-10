import { useTranslation } from 'react-i18next'
import { asStringList } from '@/utils/lists'

export function CodeScreen() {
  const { t } = useTranslation()
  const lines = asStringList(t('device.code', { returnObjects: true }))

  return (
    <div className="flex h-full flex-col bg-[#100e16] px-3.5 pt-8 pb-4">
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/12" />
        <span className="size-2 rounded-full bg-white/10" />
        <span className="ml-2 font-mono text-[10px] text-muted">{t('device.codeFile')}</span>
      </div>
      <pre className="mt-5 font-mono text-[11px] leading-6 text-[#d9d4e8]">
        {lines.map((line, index) => (
          <div key={line}>
            <span className="mr-3 inline-block w-4 text-right text-white/25">{index + 1}</span>
            {line}
          </div>
        ))}
      </pre>
    </div>
  )
}
