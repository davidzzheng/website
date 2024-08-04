import Link from 'next/link'

import { Layout } from '@/components/layout'
import { formatDate } from '@/lib/date'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { PostTableOfContents } from '@/components/post-toc'
import { PostView } from '@/components/post-view'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Post } from '@/lib/ghost'

const WPM = 150

type BlogPostViewProps = {
  post: Post
}

export const BlogPostView = ({ post }: BlogPostViewProps) => {
  const wordCount = post.html?.split(/\s+/).length ?? 0
  const readingTime = Math.ceil(wordCount / WPM)

  return (
    <Layout className="mb-8">
      <Layout.Left className="pt-8 sm:sticky sm:top-16 sm:max-h-[calc(100vh-4rem)] sm:overflow-y-auto row-start-2">
        <PostTableOfContents />
      </Layout.Left>
      <Layout.Top className="rounded-lg bg-background/75 pt-8 pb-4 ~px-4/8 space-y-2">
        <h1 className="font-bold ~text-2xl/3xl">{post.title}</h1>
        <div className="flex flex-wrap gap-y-1 items-center justify-between ~text-xs/sm">
          <span>
            {wordCount} words • {readingTime} min read
          </span>
          <p>Posted on {formatDate(post.published_at!)}</p>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {post.tags?.map((tag) => (
            <Link
              role="listitem"
              key={tag.slug}
              href={`/topics/${tag.slug}`}
              className="decorate-underline leading-5 flex cursor-pointer items-center gap-x-1 text-muted-foreground transition hover:text-foreground text-xs"
            >
              <span className="text-xs text-muted-foreground">#</span> {tag.name}
            </Link>
          ))}
        </ul>
      </Layout.Top>

      <Layout.Main className="rounded-lg bg-background/75 py-6 ~px-4/8">
        {/* <Breadcrumbs /> */}

        <PostView content={post.html!} />
      </Layout.Main>
      <Layout.Bottom className="flex justify-center mb-8">
        <ScrollToTop />
      </Layout.Bottom>
    </Layout>
  )
}
