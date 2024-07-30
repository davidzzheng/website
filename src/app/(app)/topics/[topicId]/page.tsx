import { getPayload } from '@/lib/payload'
import { TopicView } from '@/views/topic'

type TopicPageProps = {
	params: {
		topicId: string;
	};
};

export default async function TopicPage({ params }: TopicPageProps) {
	const { topicId } = params

	const payload = await getPayload()

	const topic = await payload.findByID({ collection: 'tags', id: topicId })

	const { docs: posts } = await payload.find({
		collection: 'posts',
		where: {
			tags: {
				contains: topic.id,
			},
		},
	})

	if (!topic) return null

	return <TopicView topic={topic} posts={posts} />
}
