'use server'

import parse, {
  type DOMNode,
  domToReact,
  type HTMLReactParserOptions,
  type Text,
  type Element,
} from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'

import type { CodeHighlighterOptions } from '@/lib/code'
import { removeRefParam } from '@/lib/string'
import { cn } from '@/lib/utils'
import { CodeHighlighter } from '../code-highlighter'
import { Heading } from './heading'

type PostViewProps = {
  content: string
  className?: string
}

export const PostView = async ({ content, className }: PostViewProps) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === 'tag') {
        switch (domNode.name) {
          case 'a':
            return (
              <Link
                {...domNode.attribs}
                href={removeRefParam(domNode.attribs.href ?? '')}
                target="_blank"
                rel="noopener noreferrer"
                className="decorate-underline decorate-underline-blue-500 text-blue-500"
              >
                {domToReact(domNode.children as DOMNode[], options)}
              </Link>
            )
          case 'img':
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
          case 'pre': {
            const codeEl = domNode.children[0] as Element
            const codeText = (codeEl.children[0] as Text).data
            const lang = codeEl.attribs.class?.split(
              'language-',
            )[1] as CodeHighlighterOptions['lang']
            return <CodeHighlighter code={codeText} lang={lang} />
          }
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return (
              <Heading heading={domNode.name} id={domNode.attribs.id}>
                {domToReact(domNode.children as DOMNode[], options)}
              </Heading>
            )
          default:
            return domToReact(domNode.children as DOMNode[], options)
        }
      }
    },
  }

  return (
    <article
      className={cn('prose dark:prose-invert max-w-full', 'prose-blockquote:font-light', className)}
    >
      {parse(content, options)}
    </article>
  )
}
