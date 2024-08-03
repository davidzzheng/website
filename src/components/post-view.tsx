'use server'

import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { CodeHighlighter } from './code-highlighter'

type PostViewProps = {
  content: string
  className?: string
}

export const PostView = async ({ content, className }: PostViewProps) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === 'tag') {
        // Example of custom component replacement
        if (domNode.name === 'a') {
          return (
            <Link
              href={domNode.attribs.href ?? ''}
              {...domNode.attribs}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              {domToReact(domNode.children, options)}
            </Link>
          )
        } else if (domNode.name === 'img') {
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
        } else if (domNode.name === 'pre') {
          const codeEl = domNode.children[0]
          const codeText = codeEl.children[0].data
          return <CodeHighlighter code={codeText} />
        }

        return domToReact(domNode.children, options)
      }
    },
  }

  return (
    <article className={cn('prose dark:prose-invert max-w-none', className)}>
      {parse(content, options)}
    </article>
  )
}
