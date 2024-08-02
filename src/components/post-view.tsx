'use server'

import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import { CodeHighlighter } from './ui/code-highlighter'

type PostViewProps = {
  content: string
}

export const PostView = async ({ content }: PostViewProps) => {
  const parsed = parse(content, {
    replace: async (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'img') {
        return (
          <Image
            src={domNode.attribs.src}
            alt={domNode.attribs.alt}
            width={0}
            height={0}
            sizes="100%"
            className="rounded-lg"
          />
        )
      } else if (domNode.name === 'a') {
        return (
          <Link href={domNode.attribs.href} className="decorate-underline">
            {domNode.children[0].data}
          </Link>
        )
      } else if (domNode.name === 'pre') {
        const codeEl = domNode.children[0]
        const codeText = codeEl.children[0].data
        return <CodeHighlighter code={codeText} />
      } else {
        return domNode
      }
    },
  })

  return <article className="prose dark:prose-invert max-w-none">{parsed}</article>
}
