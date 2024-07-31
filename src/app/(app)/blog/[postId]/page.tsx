import { getPayload } from '@/lib/payload'
import { BlogPostView } from '@/views/blog-post'

type BlogPostPageProps = {
  params: {
    postId: string
  }
}

export async function generateStaticParams() {
  const payload = await getPayload()

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      updatedAt: {
        less_than: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  })

  return posts.map((topic) => ({
    postId: `${topic.id}`,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { postId } = params

  const payload = await getPayload()

  const post = await payload.findByID({ collection: 'posts', id: postId })

  return {
    title: post.title,
    description: post.subtitle,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { postId } = params
  const payload = await getPayload()

  const post = await payload.findByID({ collection: 'posts', id: postId })

  if (!post) return null

  return <BlogPostView post={post} />
}
