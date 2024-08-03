import { Breadcrumbs } from '@/components/breadcrumbs'
import { Layout } from '@/components/layout'
import { PostList } from '@/components/post-list'
import { Post, Tag } from '@/lib/ghost'

type TopicViewProps = {
  topic: Tag
  posts: Post[]
}

export const TopicView = ({ posts }: TopicViewProps) => {
  return (
    <Layout>
      <Layout.Main className="rounded-lg bg-background/75 py-3">
        <div className="px-6 my-3">
          <Breadcrumbs />
        </div>

        <PostList posts={posts} />
      </Layout.Main>
    </Layout>
  )
}
