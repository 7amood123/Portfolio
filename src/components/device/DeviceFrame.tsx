import type { ReactNode, Ref } from 'react'

export function DeviceFrame({
  sceneRef,
  tiltRef,
  children,
}: {
  sceneRef?: Ref<HTMLDivElement>
  tiltRef?: Ref<HTMLDivElement>
  children: ReactNode
}) {
  return (
    <div ref={sceneRef} className="device-scene">
      <div ref={tiltRef} className="device-tilt">
        <div className="device-shell">
          <span className="device-button" aria-hidden="true" />
          <div className="device-screen">
            <span className="device-island" aria-hidden="true" />
            {children}
            <span className="device-glass" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="device-shadow" aria-hidden="true" />
    </div>
  )
}
