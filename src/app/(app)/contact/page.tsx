import { getPayload } from '@/lib/payload'
import { ContactView } from '@/views/contact'

export default async function ContactPage() {
	const payload = await getPayload()

	const data = await payload.find({
		collection: 'pages',
	})

	return <ContactView />
}
