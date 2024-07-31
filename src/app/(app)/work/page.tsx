import { getPayload } from '@/lib/payload'
import { WorkView } from '@/views/work'
import { Work } from 'payload-types'

export default async function WorkPage() {
  const payload = await getPayload()

  const { docs: works } = await payload.find({
    collection: 'work',
  })

  // Object.groupBy is not supported on Vercel yet (needs Node 21)
  // const { fulltime: positions = [], project: projects = [] } = Object.groupBy(
  // 	works,
  // 	(work) => work.workType!,
  // )

  const { fulltime: positions = [], project: projects = [] } = works.reduce<{
    fulltime: Work[]
    project: Work[]
  }>(
    (acc, work) => {
      if (work.workType === 'fulltime') {
        acc.fulltime.push(work)
      } else if (work.workType === 'project') {
        acc.project.push(work)
      }
      return acc
    },
    { fulltime: [], project: [] },
  )

  return <WorkView positions={positions} projects={projects} />
}
