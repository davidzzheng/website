export const createSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim()

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
