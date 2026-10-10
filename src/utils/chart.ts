export function buildLinePath(values: number[], width: number, height: number) {
  if (values.length === 0) return ''
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  return values
    .map((value, index) => {
      const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width
      const y = height - ((value - min) / span) * height
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

export function buildAreaPath(values: number[], width: number, height: number) {
  const line = buildLinePath(values, width, height)
  if (!line) return ''
  return `${line} L${width.toFixed(2)} ${height.toFixed(2)} L0 ${height.toFixed(2)} Z`
}
