import { getPayload } from '@/lib/payload'
import { WorkView } from '@/views/work'

export default async function WorkPage() {
	const payload = await getPayload()

	const { docs: works } = await payload.find({
		collection: 'work',
	})

	const { fulltime: positions = [], project: projects = [] } = Object.groupBy(
		works,
		(work) => work.workType!,
	)

	return <WorkView positions={positions} projects={projects} />
}
