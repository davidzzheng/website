import { getPayload } from '@/lib/payload'

export default async function WorkPage() {
	const payload = await getPayload()

	const data = await payload.find({
		collection: 'pages',
	})

	return <div>Work Page</div>
}
