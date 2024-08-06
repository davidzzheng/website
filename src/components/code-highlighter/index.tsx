import { ClipboardIcon } from 'lucide-react'

import { type CodeHighlighterOptions, codeToHtml, stripCodeDirectives } from '@/lib/code'
import { Clipboard } from '../ui/clipboard'

import './index.scss'
import { cn } from '@/lib/utils'

type CodeHighlighterProps = {
  code: string
  lang?: CodeHighlighterOptions['lang']
  theme?: CodeHighlighterOptions['theme']
  className?: string
}

export const CodeHighlighter = async ({
  code,
  lang = 'ts',
  theme = 'tokyo-night',
  className,
}: CodeHighlighterProps) => {
  const html = await codeToHtml(code, { lang, theme })

  return (
    <div className={cn('relative', className)}>
      <Clipboard
        value={stripCodeDirectives(code)}
        className="absolute top-4 right-4 z-10 opacity-60 transition hover:opacity-100"
      >
        <ClipboardIcon className="~size-4/5" aria-label="Copy code to clipboard" />
      </Clipboard>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
