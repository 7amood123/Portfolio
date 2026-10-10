import { useLayoutEffect, useRef, type RefObject } from 'react'
import { DeviceFrame } from '@/components/device/DeviceFrame'
import { DeviceScreen } from '@/components/device/DeviceScreen'
import { screenIds, type ScreenId } from '@/components/device/deviceMotion'
import { CodeScreen } from '@/components/device/screens/CodeScreen'
import { FinanceTrackerScreen } from '@/components/device/screens/FinanceTrackerScreen'
import { PortraitScreen } from '@/components/device/screens/PortraitScreen'
import { SoulSpaceScreen } from '@/components/device/screens/SoulSpaceScreen'
import { TeknoFestScreen } from '@/components/device/screens/TeknoFestScreen'

const screenViews = {
  portrait: PortraitScreen,
  finance: FinanceTrackerScreen,
  soulspace: SoulSpaceScreen,
  teknofest: TeknoFestScreen,
  code: CodeScreen,
} as const

export interface DeviceBundle {
  scene: HTMLDivElement | null
  tilt: HTMLDivElement | null
  screens: Partial<Record<ScreenId, HTMLDivElement | null>>
}

export function InteractiveDevice({
  bundleRef,
  screen = 'portrait',
  live = false,
}: {
  bundleRef?: RefObject<DeviceBundle | null>
  screen?: ScreenId
  live?: boolean
}) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const layers = useRef<Partial<Record<ScreenId, HTMLDivElement | null>>>({})
  const ids = live ? screenIds : [screen]

  useLayoutEffect(() => {
    if (!bundleRef) return
    bundleRef.current = {
      scene: sceneRef.current,
      tilt: tiltRef.current,
      screens: layers.current,
    }
    return () => {
      bundleRef.current = null
    }
  }, [bundleRef])

  return (
    <div className="device-slot" aria-hidden="true">
      <DeviceFrame sceneRef={sceneRef} tiltRef={tiltRef}>
        {ids.map((id) => {
          const View = screenViews[id]
          return (
            <DeviceScreen
              key={id}
              id={id}
              active={!live && id === screen ? true : id === 'portrait'}
              layerRef={(node) => {
                layers.current[id] = node
              }}
            >
              <View />
            </DeviceScreen>
          )
        })}
      </DeviceFrame>
    </div>
  )
}
