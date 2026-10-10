export function buildPulsePath(width: number, height: number, beats = 4) {
  const steps = beats * 48
  let path = ''
  for (let index = 0; index <= steps; index += 1) {
    const progress = index / steps
    const beat = (progress * beats) % 1
    const peak = Math.exp(-(((beat - 0.16) * 14) ** 2))
    const dicrotic = 0.32 * Math.exp(-(((beat - 0.38) * 18) ** 2))
    const x = progress * width
    const y = height * 0.78 - (peak + dicrotic) * height * 0.62
    path += `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)} `
  }
  return path.trim()
}
