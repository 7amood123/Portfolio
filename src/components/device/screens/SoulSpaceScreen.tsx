import { useTranslation } from 'react-i18next'
import { screenAssets } from '@/components/device/screenAssets'
import { asChatLines } from '@/utils/lists'

export function SoulSpaceScreen() {
  const { t } = useTranslation()
  if (screenAssets.soulspace) {
    return <img src={screenAssets.soulspace} alt="" className="h-full w-full object-cover object-top" />
  }

  const messages = asChatLines(t('projects.soulspace.messages', { returnObjects: true }))

  return (
    <div className="flex h-full flex-col px-3.5 pt-8 pb-4">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm text-text">SoulSpace</p>
        <span className="text-[9px] tracking-[0.14em] text-violet uppercase">{t('projects.finance.demo')}</span>
      </div>
      <div className="mt-4 flex flex-1 flex-col justify-end gap-2">
        {messages.map((message) => (
          <p
            key={message.text}
            className={
              message.from === 'user'
                ? 'ml-6 rounded-2xl rounded-br-md bg-[#2a2340] px-3 py-2 text-[11px] leading-snug text-text'
                : 'mr-4 rounded-2xl rounded-bl-md bg-[#1c1826] px-3 py-2 text-[11px] leading-snug text-muted'
            }
          >
            {message.text}
          </p>
        ))}
      </div>
    </div>
  )
}
