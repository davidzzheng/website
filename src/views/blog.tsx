import Link from 'next/link'

import { Layout } from '@/components/layout'
import { formatRelativeDate } from '@/lib/date'
import { Post } from '@/lib/ghost'

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
                  className="m-3 flex flex-col gap-y-2 rounded px-3 py-2 transition hover:bg-muted/50"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="decorate-underline font-semibold ~text-lg/3xl w-fit"
                  >
                    {post.title}
                  </Link>
                  <div className="flex justify-between items-center">
                    <p className="~text-xs/sm sm:mt-2 sm:text-right">
                      Posted {formatRelativeDate(post.created_at!)}
                    </p>
                    <ul className="flex justify-end gap-2">
                      {post.tags?.map((tag) => (
                        <li key={tag.name} className="rounded bg-muted px-1 py-0.5 text-xs">
                          {tag.name}
                        </li>
                      ))}
                    </ul>
                  </div>
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
