import { getCollection } from "astro:content"
import { compareDesc } from "date-fns"

export { getPublishedPosts, getLatestPosts } from "@/lib/posts"
export type { Post } from "@/lib/posts"

export const getPositions = async (category?: "work" | "community") => {
  const positions = await getCollection("positions")
  return positions
    .filter((p) => !category || p.data.category === category)
    .toSorted((a, b) =>
      compareDesc(new Date(a.data.start), new Date(b.data.start))
    )
}

export const getProjects = async () => {
  const projects = await getCollection("projects")
  return projects.toSorted((a, b) =>
    compareDesc(
      new Date(String(a.data.year ?? 0), 0),
      new Date(String(b.data.year ?? 0), 0)
    )
  )
}
