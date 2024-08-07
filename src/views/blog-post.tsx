import Link from 'next/link'
import { Suspense } from 'react'

import { Layout } from '@/components/layout'
import { formatDate } from '@/lib/date'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { PostTableOfContents } from '@/components/post-toc'
import { PostView } from '@/components/post-view'
import { ScrollToTop } from '@/components/scroll-to-top'
import type { Post } from '@/lib/ghost'
import { Skeleton } from '@/components/ui/skeleton'

const WPM = 150

type BlogPostViewProps = {
  post: Post
}

export const BlogPostView = ({ post }: BlogPostViewProps) => {
  const wordCount = post.html?.split(/\s+/).length ?? 0
  const readingTime = Math.ceil(wordCount / WPM)

  return (
    <Layout className="mb-8">
      <Layout.Left className="row-start-2 pt-8 sm:sticky sm:top-16 sm:max-h-[calc(100vh-4rem)] sm:overflow-y-auto">
        <PostTableOfContents />
      </Layout.Left>
      <Layout.Top className="~px-4/8 space-y-2 rounded-lg bg-background/75 pt-8 pb-4">
        <h1 className="~text-2xl/3xl font-bold">{post.title}</h1>
        <div className="~text-xs/sm flex flex-wrap items-center justify-between gap-y-1">
          <span>
            {wordCount} words · {readingTime} min read
          </span>
          <p>Posted on {formatDate(post.published_at!)}</p>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {post.tags?.map((tag) => (
            <Link
              role="listitem"
              key={tag.slug}
              href={`/topics/${tag.slug}`}
              className="decorate-underline ~text-xs/sm flex cursor-pointer items-center gap-x-1 text-muted-foreground leading-5 tracking-wide transition hover:text-foreground"
            >
              <span className="text-muted-foreground text-xs">#</span> {tag.name}
            </Link>
          ))}
        </ul>
      </Layout.Top>

      <Layout.Main className="~px-4/8 rounded-lg bg-background/75 py-6">
        {/* <Breadcrumbs /> */}

        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-12 w-2/3" />
              <Skeleton className="mb-16 h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          }
        >
          <PostView content={post.html!} />
        </Suspense>
      </Layout.Main>
      <Layout.Bottom className="mb-8 flex justify-center">
        <ScrollToTop />
      </Layout.Bottom>
    </Layout>
  )
}
