import type { ReactNode, Ref } from 'react'
import type { ScreenId } from '@/components/device/deviceMotion'

export function DeviceScreen({
  id,
  active,
  layerRef,
  children,
}: {
  id: ScreenId
  active: boolean
  layerRef?: Ref<HTMLDivElement>
  children: ReactNode
}) {
  return (
    <div
      ref={layerRef}
      data-screen={id}
      className="device-layer bg-[#100e16]"
      style={{ opacity: active ? 1 : 0 }}
    >
      {children}
    </div>
  )
}
