import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppProviders } from '@/app/providers/AppProviders'
import { PortraitScreen } from '@/components/device/screens/PortraitScreen'

vi.mock('@/components/device/screenAssets', () => ({
  screenAssets: { profile: null, finance: null, soulspace: null, teknofest: null },
}))

describe('portrait screen without a profile photo', () => {
  it('falls back to initials and the name instead of a broken image', () => {
    const { container } = render(
      <AppProviders>
        <PortraitScreen />
      </AppProviders>,
    )
    expect(container.querySelector('img')).toBeNull()
    expect(screen.getByText('MA')).toBeInTheDocument()
    expect(screen.getByText('Mohammed Abughazala')).toBeInTheDocument()
  })
})
