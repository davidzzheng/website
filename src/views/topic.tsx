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
        <h1 className="font-bold tracking-tighter ~text-2xl/4xl">{topic.name}</h1>
        <p>(you shouldn't be here yet, this part is still being built)</p>
      </Layout.Main>
    </Layout>
  )
}
