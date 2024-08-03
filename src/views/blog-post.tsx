import Link from 'next/link'

import { Layout } from '@/components/layout'
import { formatDate } from '@/lib/date'

import { Post } from '@/lib/ghost'
import { PostView } from '@/components/post-view'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Breadcrumbs } from '@/components/breadcrumbs'

const WPM = 150

type BlogPostViewProps = {
  post: Post
}

export const BlogPostView = ({ post }: BlogPostViewProps) => {
  const wordCount = post.html?.split(/\s+/).length ?? 0
  const readingTime = Math.ceil(wordCount / WPM)

  return (
    <Layout className="mb-8">
      <Layout.Main className="rounded-lg bg-background/75 p-8">
        {/* <Breadcrumbs /> */}

        <div className="mb-4">
          <h1 className="font-bold ~text-3xl/4xl">{post.title}</h1>
        </div>
        <div className="flex flex-wrap gap-y-1 items-center justify-between mb-4 ~text-xs/sm">
          <span>
            {wordCount} words • {readingTime} min read
          </span>
          <p>Posted on {formatDate(post.published_at!)}</p>
        </div>

        <PostView content={post.html!} className="mb-12" />
        <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-end">
          {post.tags?.map((tag) => (
            <Link
              key={tag.slug}
              href={`/topics/${tag.slug}`}
              className="decorate-underline flex cursor-pointer text-muted-foreground transition hover:text-foreground"
            >
              <span className="text-xs text-muted-foreground">#</span> {tag.name}
            </Link>
          ))}
        </ul>
      </Layout.Main>
      <Layout.Bottom className="flex justify-center">
        <ScrollToTop />
      </Layout.Bottom>
    </Layout>
  )
}
