import { transformerNotationDiff } from '@shikijs/transformers'
import { createHighlighter } from 'shiki/bundle/web'

const theme = 'tokyo-night'

type Highlighter = Awaited<ReturnType<typeof createHighlighter>>

class ShikiSingleton {
  private static instance: ShikiSingleton
  private highlighter: Highlighter | undefined

  private constructor() {}

  public static getInstance(): ShikiSingleton {
    if (!ShikiSingleton.instance) {
      ShikiSingleton.instance = new ShikiSingleton()
    }
    return ShikiSingleton.instance
  }

  public async getHighlighter(): Promise<Highlighter> {
    if (!this.highlighter) {
      this.highlighter = await createHighlighter({
        themes: [theme],
        langs: ['typescript', 'javascript', 'json', 'html', 'css', 'markdown'],
      })
    }
    return this.highlighter
  }
}

export const codeToHtml = async (code: string, lang: string = 'typescript') => {
  const highlighter = await ShikiSingleton.getInstance().getHighlighter()

  return highlighter.codeToHtml(code, {
    lang,
    theme,
    transformers: [transformerNotationDiff()],
  })
}
