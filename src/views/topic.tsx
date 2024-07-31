'use client'

import { Layout } from '@/components/layout'
import { Post, Tag } from 'payload-types'

type TopicViewProps = {
  topic: Tag
  posts: Post[]
}

export const TopicView = ({ topic }: TopicViewProps) => {
  return (
    <Layout>
      <Layout.Main className="rounded-lg bg-background/75 p-8">
        <h1 className="my-3 px-6 font-bold tracking-tighter ~text-2xl/4xl">{topic.name}</h1>
      </Layout.Main>
    </Layout>
  )
}
