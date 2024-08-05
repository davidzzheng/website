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
        <div className="my-3 px-6">
          <Breadcrumbs />
        </div>

        <section className="flex flex-wrap gap-x-2 gap-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="m-2 rounded p-4 transition hover:bg-muted/50">
              <div className="flex w-fit items-center justify-between">
                <Link
                  href={`/topics/${topic.slug}`}
                  className="~text-lg/2xl decorate-underline font-semibold"
                >
                  <span className="~text-sm/lg mr-2 text-muted-foreground">#</span>
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
