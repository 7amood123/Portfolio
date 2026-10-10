export const screenIds = ['portrait', 'finance', 'soulspace', 'teknofest', 'code'] as const

export type ScreenId = (typeof screenIds)[number]

export interface Markers {
  finance: number
  soulspace: number
  teknofest: number
  about: number
  skills: number
  skillsEnd: number
}

export interface ScreenPose {
  opacity: number
  y: number
}

export interface DevicePose {
  rotateX: number
  rotateY: number
  scale: number
  x: number
  opacity: number
}

const blendWindow = 0.04

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * clamp(amount)
}

function stops(markers: Markers): Array<{ id: ScreenId; at: number }> {
  return [
    { id: 'portrait', at: 0 },
    { id: 'finance', at: markers.finance },
    { id: 'soulspace', at: markers.soulspace },
    { id: 'teknofest', at: markers.teknofest },
    { id: 'code', at: markers.about },
  ]
}

export function screenPoses(progress: number, markers: Markers): Record<ScreenId, ScreenPose> {
  const poses = Object.fromEntries(screenIds.map((id) => [id, { opacity: 0, y: 16 }])) as Record<ScreenId, ScreenPose>
  const points = stops(markers)
  const current = clamp(progress)
  let index = points.length - 1
  for (let cursor = 0; cursor < points.length - 1; cursor += 1) {
    const point = points[cursor]
    const next = points[cursor + 1]
    if (!point || !next) continue
    if (current >= point.at && current < next.at) {
      index = cursor
      break
    }
  }

  const active = points[index]
  const upcoming = points[index + 1]
  if (!active) return poses
  if (!upcoming || upcoming.at - current >= blendWindow) {
    poses[active.id] = { opacity: 1, y: 0 }
    return poses
  }

  const amount = 1 - (upcoming.at - current) / blendWindow
  poses[active.id] = { opacity: 1 - amount, y: -18 * amount }
  poses[upcoming.id] = { opacity: amount, y: 18 * (1 - amount) }
  return poses
}

export function devicePose(progress: number, markers: Markers, desktop: boolean): DevicePose {
  const current = clamp(progress)
  const introTilt = desktop ? -18 : -12
  const workTilt = desktop ? -26 : -16
  const restTilt = desktop ? -8 : -6

  if (current < markers.finance) {
    const amount = markers.finance <= 0 ? 1 : current / markers.finance
    return {
      rotateY: lerp(introTilt, workTilt, amount),
      rotateX: lerp(4, 6, amount),
      scale: 1,
      x: 0,
      opacity: 1,
    }
  }

  if (current < markers.about) {
    return { rotateY: workTilt, rotateX: 5, scale: 1, x: 0, opacity: 1 }
  }

  if (current < markers.skills) {
    const amount = (current - markers.about) / Math.max(markers.skills - markers.about, 0.001)
    return {
      rotateY: lerp(workTilt, restTilt, amount),
      rotateX: lerp(5, 3, amount),
      scale: lerp(1, 0.84, amount),
      x: lerp(0, desktop ? 10 : 0, amount),
      opacity: 1,
    }
  }

  const amount = (current - markers.skills) / Math.max(markers.skillsEnd - markers.skills, 0.001)
  return {
    rotateY: restTilt,
    rotateX: 3,
    scale: lerp(0.84, 0.74, amount),
    x: desktop ? 10 : 0,
    opacity: 1 - clamp(amount),
  }
}
