import type { Metadata } from 'next'

import { ghost } from '@/lib/ghost'
import { BlogView } from '@/views/blog'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  const posts = await ghost.posts.browse({
    order: 'published_at DESC',
    include: 'tags',
  })

  return <BlogView posts={posts} />
}
