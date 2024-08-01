'use client'
import Link from 'next/link'

import { Layout } from '@/components/layout'
import { formatDate } from '@/lib/date'
import { Post } from 'payload-types'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { LexicalViewer } from '@/components/lexical-viewer'

const WPM = 150

type BlogPostViewProps = {
  post: Post
}

export const BlogPostView = ({ post }: BlogPostViewProps) => {
  const wordCount = post.contentHtml?.split(/\s+/).length ?? 0
  const readingTime = Math.ceil(wordCount / WPM)

  return (
    <Layout className="mb-8">
      <Layout.Main className="rounded-lg bg-background/75 p-8">
        {/* <Breadcrumbs /> */}

        <div className="mb-4">
          <h1 className="font-bold tracking-tighter ~text-3xl/4xl">{post.title}</h1>
          {post.subtitle ? (
            <p className="text-muted-foreground ~text-lg/xl">{post.subtitle}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-y-1 items-center justify-between mb-8 ~text-xs/sm">
          <span>
            {wordCount} words • {readingTime} min read
          </span>
          <p>Posted on {formatDate(post.createdAt)}</p>
        </div>
        <LexicalViewer content={JSON.stringify(post.content)} />
        {/* <div */}
        {/*   className="prose mb-8 mt-4 text-lg text-foreground dark:prose-invert" */}
        {/*   dangerouslySetInnerHTML={{ */}
        {/*     __html: post.contentHtml!, */}
        {/*   }} */}
        {/* /> */}
        <ul className="flex gap-2 justify-end">
          {post.tags?.map((tag) => (
            <Link
              key={tag.name}
              href={`/topics/${tag.id}`}
              className="decorate-underline flex cursor-pointer text-muted-foreground transition hover:text-foreground"
            >
              <span className="text-xs">#</span> {tag.name}
            </Link>
          ))}
        </ul>
      </Layout.Main>
      <Layout.Bottom className="flex justify-center">
        <Button variant="secondary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ArrowUp className="mr-2 size-4" />
          Back to top
        </Button>
      </Layout.Bottom>
    </Layout>
  )
}
