import { getPayload } from '@/lib/payload'
import { TopicsView } from '@/views/topics'

export default async function TopicsPage() {
  const payload = await getPayload()

  const { docs: topics } = await payload.find({
    collection: 'tags',
  })

  return <TopicsView topics={topics} />
}
