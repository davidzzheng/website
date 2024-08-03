export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const removeRefParam = (url: string) =>
  url.replace(/(\?|&)ref=[^&]+(&|$)/, '$1').replace(/\?$/, '')
