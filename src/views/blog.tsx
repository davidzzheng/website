import { Layout } from '@/components/layout'
import type { Post } from '@/lib/ghost'
import { PostList } from '@/components/post-list'

type BlogViewProps = {
  posts: Post[]
}

export const BlogView = ({ posts }: BlogViewProps) => {
  return (
    <Layout>
      <Layout.Main className="rounded-lg bg-background/75 py-3">
        {posts.length > 0 ? (
          <>
            <h1 className="~text-2xl/4xl my-3 px-6 font-bold tracking-tighter">Blog</h1>
            <PostList posts={posts} />
          </>
        ) : (
          <p className="text-center text-lg">No posts yet.</p>
        )}
      </Layout.Main>
    </Layout>
  )
}
