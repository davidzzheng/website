import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { createHighlighterCore } from 'shiki/core'
import loadWasm from 'shiki/wasm'

type Highlighter = Awaited<ReturnType<typeof createHighlighterCore>>

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
      this.highlighter = await createHighlighterCore({
        themes: [
          import('shiki/themes/tokyo-night.mjs'),
          // TODO: https://github.com/shikijs/shiki/issues/730
          // import('shiki/themes/rose-pine-moon.mjs'),
          // import('shiki/themes/rose-pine-dawn.mjs'),
        ],
        langs: [
          import('shiki/langs/ts.mjs'),
          import('shiki/langs/json.mjs'),
          import('shiki/langs/html.mjs'),
          import('shiki/langs/css.mjs'),
        ],
        loadWasm,
      })
    }
    return this.highlighter
  }
}

export type CodeHighlighterOptions = {
  lang: 'ts' | 'js' | 'json' | 'html' | 'css'
  theme: 'tokyo-night' | 'rose-pine-moon' | 'rose-pine-dawn'
}

export const codeToHtml = async (
  code: string,
  options: CodeHighlighterOptions = {
    lang: 'ts',
    theme: 'tokyo-night',
  },
) => {
  const highlighter = await ShikiSingleton.getInstance().getHighlighter()
  const { theme, lang } = options

  return highlighter.codeToHtml(code, {
    lang,
    theme,
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationFocus(),
      transformerNotationErrorLevel(),
    ],
  })
}

export const stripComments = (code: string) =>
  code.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1')

export const stripCodeDirectives = (code: string) =>
  code.replace(/[ \t]*\/\/\s*\[!code\s+[^\]]+\]\s*$/gm, '')
