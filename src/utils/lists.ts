export interface ChatLine {
  from: 'user' | 'companion'
  text: string
}

export function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

export function asChatLines(value: unknown): ChatLine[] {
  if (!Array.isArray(value)) return []
  const lines: ChatLine[] = []
  for (const item of value) {
    if (!item || typeof item !== 'object') continue
    const record = item as { from?: unknown; text?: unknown }
    if ((record.from === 'user' || record.from === 'companion') && typeof record.text === 'string') {
      lines.push({ from: record.from, text: record.text })
    }
  }
  return lines
}
