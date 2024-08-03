import { ClipboardIcon } from 'lucide-react'

import { codeToHtml, stripComments } from '@/lib/code'
import { Button } from '../ui/button'
import { Clipboard } from '../ui/clipboard'

import './index.scss'

type CodeHighlighterProps = {
  code: string
  language?: string
}

export const CodeHighlighter = async ({ code, language = 'typescript' }: CodeHighlighterProps) => {
  const html = await codeToHtml(code, language)

  return (
    <div className="relative">
      <Clipboard
        value={stripComments(code)}
        className="absolute right-4 top-4 transition opacity-60 hover:opacity-100"
      >
        <ClipboardIcon className="w-5 h-5" aria-label="Copy code to clipboard" />
      </Clipboard>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
