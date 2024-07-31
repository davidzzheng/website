import Link from 'next/link'
import { Post } from 'payload-types'

import { Layout } from '@/components/layout'
import { formatRelativeDate } from '@/lib/date'

type BlogViewProps = {
  posts: Post[]
}

export const BlogView = ({ posts }: BlogViewProps) => {
  return (
    <Layout>
      <Layout.Main className="rounded-lg bg-background/75 py-3">
        {posts.length > 0 ? (
          <>
            <h1 className="my-3 px-6 font-bold tracking-tighter ~text-2xl/4xl">Blog</h1>
            <section className="flex flex-col gap-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="m-3 flex flex-col gap-y-2 rounded px-4 py-2 transition hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-y-0.5">
                      <Link
                        href={`/blog/${post.id}`}
                        className="decorate-underline pb-1 font-semibold ~text-lg/3xl"
                      >
                        {post.title}
                      </Link>
                      {post.subtitle ? (
                        <p className="text-muted-foreground ~text-lg">{post.subtitle}</p>
                      ) : null}
                    </div>

                    <p className="~text-xs/sm mt-1">{formatRelativeDate(post.createdAt)}</p>
                  </div>
                  <ul className="flex justify-end gap-2">
                    {post.tags?.map((tag) => (
                      <li key={tag.name} className="rounded bg-muted px-1 py-0.5 text-xs">
                        {tag.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </>
        ) : (
          <p className="text-center text-lg">No posts yet.</p>
        )}
      </Layout.Main>
    </Layout>
  )
}
