import { ghost } from '@/lib/ghost'
import { getPayload } from '@/lib/payload'
import { TopicView } from '@/views/topic'

type TopicPageProps = {
  params: {
    slug: string
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = params

  const topic = await ghost.tags.read({ slug })

  if (!topic) throw new Error('Topic not found')

  const posts = await ghost.posts.browse({
    filter: `tag:${topic.name}`,
    include: 'tags',
  })

  return <TopicView topic={topic} posts={posts} />
}
