import { codeToHtml } from '@/lib/code'

type CodeHighlighterProps = {
  code: string
  language?: string
}

export const CodeHighlighter = async ({ code, language = 'typescript' }: CodeHighlighterProps) => {
  const html = await codeToHtml(code, language)

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
