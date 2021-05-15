export const toYYYYMMDD = d => {
  if (!d) return ''
  const date = new Date(d)
  return date.toISOString().slice(0, 10)
}
export const getMinutesFromSecs = secs => {
  const minutes = Math.floor(secs / 60)
  return minutes
}
