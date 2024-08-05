import type { MetadataRoute } from 'next'

import { ghost } from '@/lib/ghost'
import { BASE_URL } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await ghost.posts.browse({
    limit: 'all',
    fields: 'slug,updated_at',
  })

  return posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: 'weekly',
    priority: 1,
  })) as MetadataRoute.Sitemap
}
