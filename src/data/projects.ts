export type ProjectId = 'finance' | 'soulspace' | 'teknofest'
export type ProjectLayout = 'feature' | 'reverse' | 'instrument'

export interface ProjectMeta {
  id: ProjectId
  index: string
  layout: ProjectLayout
  start: string
  end: string | null
}

export const projects: readonly ProjectMeta[] = [
  { id: 'finance', index: '01', layout: 'feature', start: '2025-09', end: null },
  { id: 'soulspace', index: '02', layout: 'reverse', start: '2024-09', end: '2025-07' },
  { id: 'teknofest', index: '03', layout: 'instrument', start: '2025-02', end: '2025-07' },
]

export const otherWorkIds = ['client', 'blog'] as const
