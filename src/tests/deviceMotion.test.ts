import { describe, expect, it } from 'vitest'
import { compactPose, devicePose, heroTilt, previousScreens, screenPoses, type Markers } from '@/components/device/deviceMotion'

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

describe('compact (mobile) phone poses', () => {
  it('shows the previous screen before the phone arrives and its own screen after', () => {
    expect(compactPose(0).previous.opacity).toBe(1)
    expect(compactPose(0).current.opacity).toBe(0)
    expect(compactPose(1).previous.opacity).toBe(0)
    expect(compactPose(1).current.opacity).toBe(1)
  })

  it('crossfades without ever dimming both screens at once', () => {
    for (let step = 0; step <= 20; step += 1) {
      const pose = compactPose(step / 20)
      expect(pose.previous.opacity + pose.current.opacity).toBeCloseTo(1, 5)
    }
  })

  it('is a pure function of progress, so scrolling back reverses it', () => {
    expect(compactPose(0.5)).toEqual(compactPose(0.5))
    expect(compactPose(-1)).toEqual(compactPose(0))
    expect(compactPose(2)).toEqual(compactPose(1))
  })

  it('chains the projects in order: portrait, finance, soulspace, teknofest', () => {
    expect(previousScreens).toEqual({ finance: 'portrait', soulspace: 'finance', teknofest: 'soulspace' })
  })

  it('keeps the hero tilt small and bounded', () => {
    expect(heroTilt(0).rotateY).toBe(-12)
    expect(heroTilt(1).rotateY).toBe(-4)
    expect(heroTilt(5)).toEqual(heroTilt(1))
  })
})
