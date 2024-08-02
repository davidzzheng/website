'use client'

import { Layout } from '@/components/layout'
import { Tag } from '@/lib/ghost'

type TopicsViewProps = {
  topics: Tag[]
}

export const TopicsView = ({ topics }: TopicsViewProps) => {
  return (
    <Layout>
      <Layout.Main className="rounded-lg bg-background/75 p-8">
        {/* <Breadcrumbs /> */}

        <h1 className="font-bold tracking-tighter ~text-2xl/4xl">Topics</h1>
        <section className="flex flex-col gap-y-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="m-2 flex flex-col gap-y-2 rounded p-4 transition hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold ~text-lg/2xl">{topic.name}</h2>
              </div>
            </div>
          ))}
        </section>
      </Layout.Main>
    </Layout>
  )
}
