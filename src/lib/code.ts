import { createHighlighter } from 'shiki'

export const codeToHtml = async (code: string, lang: string = 'typescript') => {
  const highlighter = await createHighlighter({
    themes: ['tokyo-night'],
    langs: [lang],
  })

  return highlighter.codeToHtml(code, {
    lang,
    theme: 'tokyo-night',
  })
}
