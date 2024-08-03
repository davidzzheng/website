import { ClipboardIcon } from 'lucide-react'

import { CodeHighlighterOptions, codeToHtml, stripCodeDirectives } from '@/lib/code'
import { Clipboard } from '../ui/clipboard'

import './index.scss'

type CodeHighlighterProps = {
  code: string
  options?: CodeHighlighterOptions
}

export const CodeHighlighter = async ({ code, options }: CodeHighlighterProps) => {
  const html = await codeToHtml(code, options)

  return (
    <div className="relative">
      <Clipboard
        value={stripCodeDirectives(code)}
        className="absolute right-4 top-4 transition opacity-60 hover:opacity-100 z-10"
      >
        <ClipboardIcon className="w-5 h-5" aria-label="Copy code to clipboard" />
      </Clipboard>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
