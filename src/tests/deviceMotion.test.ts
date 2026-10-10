import { describe, expect, it } from 'vitest'
import { devicePose, screenPoses, type Markers } from '@/components/device/deviceMotion'

const markers: Markers = {
  finance: 0.2,
  soulspace: 0.4,
  teknofest: 0.58,
  about: 0.74,
  skills: 0.86,
  skillsEnd: 1,
}

describe('device scroll poses', () => {
  it('starts on the portrait and ends by fading the device', () => {
    expect(screenPoses(0, markers).portrait.opacity).toBe(1)
    expect(screenPoses(0, markers).finance.opacity).toBe(0)
    expect(devicePose(0, markers, true).opacity).toBe(1)
    expect(devicePose(1, markers, true).opacity).toBe(0)
  })

  it('shows the project that owns the current scroll range', () => {
    expect(screenPoses(0.28, markers).finance.opacity).toBe(1)
    expect(screenPoses(0.48, markers).soulspace.opacity).toBe(1)
    expect(screenPoses(0.66, markers).teknofest.opacity).toBe(1)
    expect(screenPoses(0.8, markers).code.opacity).toBe(1)
  })

  it('returns the same pose for the same progress in either direction', () => {
    const downward = screenPoses(0.39, markers)
    const upward = screenPoses(0.39, markers)
    expect(upward).toEqual(downward)
    expect(devicePose(0.39, markers, true)).toEqual(devicePose(0.39, markers, true))
  })
})