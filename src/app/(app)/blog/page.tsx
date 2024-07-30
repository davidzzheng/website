import { getPayload } from '@/lib/payload'

export default async function BlogPage() {
	const payload = await getPayload()

	const data = await payload.find({
		collection: 'pages',
	})

	return <div>Blog Page</div>
}
