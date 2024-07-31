'use client'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Layout } from '@/components/layout'
import { formatDate } from '@/lib/date'
import Link from 'next/link'
import { Post } from 'payload-types'

type BlogPostViewProps = {
  post: Post
}

export const BlogPostView = ({ post }: BlogPostViewProps) => {
  return (
    <Layout>
      <Layout.Main className="rounded-lg bg-background/75 p-8 mb-16">
        {/* <Breadcrumbs /> */}

        <h1 className="mb-3 font-bold tracking-tighter ~text-2xl/4xl">{post.title}</h1>
        <div className="flex items-center justify-between mb-8">
          <p className="~text-xs/sm">Posted on {formatDate(post.createdAt)}</p>
        </div>
        <div
          className="prose mb-8 mt-4 text-lg text-foreground dark:prose-invert"
          dangerouslySetInnerHTML={{
            __html: post.contentHtml!,
          }}
        />
        <ul className="flex gap-2 justify-end text-muted-foreground transition hover:text-foreground">
          {post.tags?.map((tag) => (
            <Link
              key={tag.name}
              href={`/topics/${tag.id}`}
              className="decorate-underline flex cursor-pointer"
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
