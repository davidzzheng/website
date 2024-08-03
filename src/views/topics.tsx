import Link from 'next/link'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Layout } from '@/components/layout'
import { Tag } from '@/lib/ghost'

type TopicsViewProps = {
  topics: Tag[]
}

export const TopicsView = ({ topics }: TopicsViewProps) => {
  return (
    <Layout>
      <Layout.Main className="rounded-lg bg-background/75 py-3">
        <div className="px-6 my-3">
          <Breadcrumbs />
        </div>

        <section className="flex flex-wrap gap-x-2 gap-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="m-2 rounded p-4 transition hover:bg-muted/50">
              <div className="flex items-center justify-between w-fit">
                <Link
                  href={`/topics/${topic.slug}`}
                  className="font-semibold ~text-lg/2xl decorate-underline"
                >
                  <span className="~text-sm/lg text-muted-foreground mr-2">#</span>
                  {topic.name}
                </Link>
              </div>
            </div>
          ))}
        </section>
      </Layout.Main>
    </Layout>
  )
}
