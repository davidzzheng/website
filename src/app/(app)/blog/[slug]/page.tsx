import { ghost } from '@/lib/ghost'
import { BlogPostView } from '@/views/blog-post'

type BlogPostPageProps = {
  params: {
    slug: string
  }
}

export const revalidate = 0

export async function generateStaticParams() {
  const posts = await ghost.posts.browse()

  return posts.map((post) => ({
    slug: post.slug,
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

  const post = await ghost.posts.read({ slug })

  if (!post) return null

  return <BlogPostView post={post} />
}
