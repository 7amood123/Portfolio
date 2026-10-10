const bundled = import.meta.glob('/public/images/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

function find(fileName: string) {
  const match = Object.entries(bundled).find(([path]) => path.endsWith(`/${fileName}`))
  return match?.[1] ?? null
}

/** Built from files that exist at compile time, so a missing photo never requests a broken URL. */
export const screenAssets = {
  profile: find('profile.jpg'),
  finance: find('finance-tracker.png'),
  soulspace: find('soulspace.png'),
  teknofest: find('teknofest.png'),
}
