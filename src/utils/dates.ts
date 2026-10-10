export function formatMonth(iso: string, language: string) {
  const [yearText, monthText] = iso.split('-')
  const year = Number(yearText)
  const month = Number(monthText)
  return new Intl.DateTimeFormat(language.startsWith('tr') ? 'tr-TR' : 'en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)))
}

export function formatPeriod(
  start: string,
  end: string | null,
  language: string,
  presentLabel: string,
) {
  const startLabel = formatMonth(start, language)
  const endLabel = end ? formatMonth(end, language) : presentLabel
  return `${startLabel} – ${endLabel}`
}
