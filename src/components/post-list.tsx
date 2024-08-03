import Link from 'next/link'

import { formatRelativeDate } from '@/lib/date'
import { Post } from '@/lib/ghost'
import { cn } from '@/lib/utils'

type PostListProps = {
  posts: Post[]
}

export const PostList = ({ posts }: PostListProps) => {
  return posts.length > 0 ? (
    <>
      <section className="flex flex-col gap-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="m-3 flex flex-col gap-y-2 rounded px-3 py-2 transition hover:bg-muted/50"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="decorate-underline font-semibold ~text-lg/3xl w-fit"
            >
              {post.title}
            </Link>
            <div className="flex justify-between">
              <p className="~text-xs/sm sm:text-right text-nowrap">
                Posted {formatRelativeDate(post.published_at!)}
              </p>
              <ul className="flex flex-wrap justify-end gap-2">
                {post.tags?.map((tag) => (
                  <Link
                    href={`/topics/${tag.slug}`}
                    key={tag.name}
                    className={cn(
                      'rounded bg-muted px-1 py-0.5 text-xs h-fit transition',
                      'hover:bg-muted-foreground hover:text-background',
                    )}
                  >
                    {tag.name}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </>
  ) : (
    <p className="text-center text-lg">No posts yet.</p>
  )
}
