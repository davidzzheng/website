'use server'

import parse, {
  DOMNode,
  domToReact,
  HTMLReactParserOptions,
  Text,
  Element,
} from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'

import { removeRefParam } from '@/lib/string'
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
        if (domNode.name === 'a') {
          return (
            <Link
              href={removeRefParam(domNode.attribs.href ?? '')}
              {...domNode.attribs}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              {domToReact(domNode.children as DOMNode[], options)}
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
          const codeEl = domNode.children[0] as Element
          const codeText = (codeEl.children[0] as Text).data
          return <CodeHighlighter code={codeText} />
        }

        return domToReact(domNode.children as DOMNode[], options)
      }
    },
  }

  return (
    <article className={cn('prose dark:prose-invert max-w-full', className)}>
      {parse(content, options)}
    </article>
  )
}
