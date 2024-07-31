import { Metadata } from 'next'

import { getPayload } from '@/lib/payload'
import { BlogView } from '@/views/blog'

export const metadata: Metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  const payload = await getPayload()

  const { docs: data = [] } = await payload.find({
    collection: 'posts',
    sort: '-createdAt',
  })

  return <BlogView posts={data} />
}
