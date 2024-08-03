import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { createHighlighterCore } from 'shiki/core'
import loadWasm from 'shiki/wasm'

export const createHighlighter = async () =>
  await createHighlighterCore({
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

type Highlighter = Awaited<ReturnType<typeof createHighlighterCore>>

export class HighliterSingleton {
  private static instance: HighliterSingleton
  private highlighter: Highlighter | undefined

  private constructor() {}

  public static getInstance(): HighliterSingleton {
    if (!HighliterSingleton.instance) {
      HighliterSingleton.instance = new HighliterSingleton()
    }
    return HighliterSingleton.instance
  }

  public async getHighlighter(): Promise<Highlighter> {
    if (!this.highlighter) {
      this.highlighter = await createHighlighter()
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
  const highlighter = await createHighlighter()
  const { theme, lang } = options

  const html = highlighter.codeToHtml(code, {
    lang,
    theme,
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationFocus(),
      transformerNotationErrorLevel(),
    ],
  })

  highlighter.dispose()

  return html
}

export const stripComments = (code: string) =>
  code.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1')

export const stripCodeDirectives = (code: string) =>
  code.replace(/[ \t]*\/\/\s*\[!code\s+[^\]]+\]\s*$/gm, '')
