import { ghost } from '@/lib/ghost'
import { BlogPostView } from '@/views/blog-post'

type BlogPostPageProps = {
  params: {
    slug: string
  }
}

export const revalidate = 0

export async function generateStaticParams() {
  const posts = await ghost.posts.browse({
    filter: 'updated_at:<now-7d',
    limit: 'all',
    fields: 'slug',
  })

  return posts.map(({ slug }) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = params

  const post = await ghost.posts.read({ slug })

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params

  const post = await ghost.posts.read({ slug }, { include: 'tags' })

  if (!post) return null

  return <BlogPostView post={post} />
}
