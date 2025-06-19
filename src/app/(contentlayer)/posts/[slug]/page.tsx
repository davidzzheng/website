import { notFound } from 'next/navigation'

import { posts } from '@/lib/data'
import { PostView } from '@/views/post'

type Props = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => posts.map((post) => ({ slug: post._raw.flattenedPath }))

const findPost = (slug: string) => posts.find((post) => post._raw.flattenedPath === `posts/${slug}`)

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) notFound()
  return { title: post.title }
}

const PostLayout = async ({ params }: Props) => {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) notFound()

  return <PostView post={post} />
}

export default PostLayout
