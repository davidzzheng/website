import { ClipboardIcon } from 'lucide-react'

import { CodeHighlighterOptions, codeToHtml, stripCodeDirectives } from '@/lib/code'
import { Clipboard } from '../ui/clipboard'

import './index.scss'

type CodeHighlighterProps = {
  code: string
  lang?: CodeHighlighterOptions['lang']
  theme?: CodeHighlighterOptions['theme']
}

export const CodeHighlighter = async ({
  code,
  lang = 'ts',
  theme = 'tokyo-night',
}: CodeHighlighterProps) => {
  const html = await codeToHtml(code, { lang, theme })

  return (
    <div className="relative">
      <Clipboard
        value={stripCodeDirectives(code)}
        className="absolute right-4 top-4 transition opacity-60 hover:opacity-100 z-10"
      >
        <ClipboardIcon className="~size-4/5" aria-label="Copy code to clipboard" />
      </Clipboard>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
