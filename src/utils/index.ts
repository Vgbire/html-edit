export const camelize = (str) => {
  const camelizeRE = /-(\w)/g
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""))
}
