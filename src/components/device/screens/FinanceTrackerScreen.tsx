import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { screenAssets } from '@/components/device/screenAssets'
import { asStringList } from '@/utils/lists'
import { buildAreaPath, buildLinePath } from '@/utils/chart'

const sampleValues = [32, 40, 36, 52, 47, 61]

export function FinanceTrackerScreen() {
  const { t } = useTranslation()
  const gradientId = useId().replace(/:/g, '')

  if (screenAssets.finance) {
    return <img src={screenAssets.finance} alt="" className="h-full w-full object-cover object-top" />
  }

  const months = asStringList(t('projects.finance.months', { returnObjects: true }))
  const line = buildLinePath(sampleValues, 220, 64)
  const area = buildAreaPath(sampleValues, 220, 64)
  const transactions = [
    ['market', 'groceries', 'marketValue'],
    ['transit', 'transport', 'transitValue'],
    ['rent', 'housing', 'rentValue'],
  ] as const

  return (
    <div className="flex h-full flex-col px-3.5 pt-8 pb-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-text">Personal Finance Tracker</p>
        <span className="rounded-full border border-violet/30 px-2 py-0.5 text-[9px] tracking-[0.14em] text-violet uppercase">
          {t('projects.finance.demo')}
        </span>
      </div>
      <p className="mt-4 text-[10px] tracking-[0.14em] text-muted uppercase">{t('projects.finance.balance')}</p>
      <p className="font-display text-[1.65rem] text-text">{t('projects.finance.balanceValue')}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Mini label={t('projects.finance.income')} value={t('projects.finance.incomeValue')} />
        <Mini label={t('projects.finance.expenses')} value={t('projects.finance.expenseValue')} />
      </div>
      <div className="mt-3 rounded-2xl bg-[#1c1826] p-2.5">
        <svg viewBox="0 0 220 64" className="h-16 w-full" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#${gradientId})`} />
          <path d={line} fill="none" stroke="#c4b5fd" strokeWidth="2" />
        </svg>
        <div className="mt-1 flex justify-between text-[9px] text-muted">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
      <ul className="mt-3 space-y-2">
        {transactions.map(([name, kind, amount]) => (
          <li key={name} className="flex items-center justify-between text-[11px]">
            <span>
              <span className="block text-text">{t(`projects.finance.${name}`)}</span>
              <span className="text-[10px] text-muted">{t(`projects.finance.${kind}`)}</span>
            </span>
            <span className="text-text">{t(`projects.finance.${amount}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#1c1826] px-2.5 py-2">
      <p className="text-[9px] tracking-[0.12em] text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-sm text-text">{value}</p>
    </div>
  )
}
