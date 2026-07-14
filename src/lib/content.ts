import { getCollection } from "astro:content"
import { compareDesc } from "date-fns"

export { getPublishedPosts, getLatestPosts } from "@/lib/posts"
export type { Post } from "@/lib/posts"

export const getPositions = async () => {
  const positions = await getCollection("positions")
  return positions.toSorted((a, b) =>
    compareDesc(new Date(a.data.start), new Date(b.data.start))
  )
}
