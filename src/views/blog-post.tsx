'use client'
import Link from 'next/link'

import { Layout } from '@/components/layout'
import { formatDate } from '@/lib/date'
import { Post } from 'payload-types'

const WPM = 150

type BlogPostViewProps = {
  post: Post
}

export const BlogPostView = ({ post }: BlogPostViewProps) => {
  const wordCount = post.contentHtml?.split(/\s+/).length ?? 0
  const readingTime = Math.ceil(wordCount / WPM)

  return (
    <Layout>
      <Layout.Main className="rounded-lg bg-background/75 p-8 mb-16">
        {/* <Breadcrumbs /> */}

        <div className="mb-4">
          <h1 className="font-bold tracking-tighter ~text-2xl/4xl">{post.title}</h1>
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
        <div
          className="prose mb-8 mt-4 text-lg text-foreground dark:prose-invert"
          dangerouslySetInnerHTML={{
            __html: post.contentHtml!,
          }}
        />
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
      {/* <Layout.Bottom className="rounded-lg bg-background/75 p-8"> */}
      {/* 	<h1 className="mb-3 font-bold tracking-tighter ~text-lg/xl"> */}
      {/* 		Other Posts */}
      {/* 	</h1> */}
      {/* </Layout.Bottom> */}
    </Layout>
  )
}
