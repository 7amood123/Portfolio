import { profile } from '@/data/profile'
import { DeviceFallback } from '@/components/device/DeviceFallback'
import { screenAssets } from '@/components/device/screenAssets'

export function PortraitScreen() {
  if (!screenAssets.profile) return <DeviceFallback />

  return (
    <div className="relative h-full">
      <img src={screenAssets.profile} alt="" className="h-full w-full object-cover object-top" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#08080d] via-[#08080d]/70 to-transparent px-4 pt-16 pb-5">
        <p className="font-display text-lg text-text" translate="no">
          {profile.name}
        </p>
      </div>
    </div>
  )
}
