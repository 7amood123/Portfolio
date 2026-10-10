export const skillGroupIds = ['backend', 'frontend', 'ai', 'practices'] as const

export type SkillGroupId = (typeof skillGroupIds)[number]
