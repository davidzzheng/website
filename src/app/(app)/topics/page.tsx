import { ghost } from '@/lib/ghost'
import { TopicsView } from '@/views/topics'

export default async function TopicsPage() {
  const topics = await ghost.tags.browse()

  return <TopicsView topics={topics} />
}
