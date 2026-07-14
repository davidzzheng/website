import type { CollectionEntry } from "astro:content"
import { getCollection, render } from "astro:content"

/** Clean URL slug from post ID (strips /index from folder-based posts) */
export function postSlug(post: Post): string {
  return post.id.replace(/\/index$/, "")
}

export type Post = CollectionEntry<"posts">

function isProd() {
  return import.meta.env.PROD
}

/** All posts, newest first. Drafts excluded in production. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) =>
    isProd() ? data.draft !== true : true
  )
  return posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  )
}

/** Latest N published posts */
export async function getLatestPosts(n: number): Promise<Post[]> {
  return (await getPublishedPosts()).slice(0, n)
}

/** All unique tags across published posts, with counts */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getPublishedPosts()
  const map = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.data.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1)
    }
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

/** Posts matching a given tag */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  return (await getPublishedPosts()).filter((p) =>
    p.data.tags.includes(tag)
  )
}

/** Adjacent posts for prev/next navigation */
export async function getAdjacentPosts(
  currentId: string
): Promise<{ prev?: Post; next?: Post }> {
  const posts = await getPublishedPosts()
  const idx = posts.findIndex((p) => p.id === currentId)
  if (idx === -1) return {}
  // posts are newest-first, so prev = newer, next = older
  return {
    prev: idx > 0 ? posts[idx - 1] : undefined,
    next: idx < posts.length - 1 ? posts[idx + 1] : undefined,
  }
}

/** Related posts by shared tags (excluding current) */
export async function getRelatedPosts(
  currentId: string,
  limit = 2
): Promise<Post[]> {
  const posts = await getPublishedPosts()
  const current = posts.find((p) => p.id === currentId)
  if (!current) return []
  const currentTags = new Set(current.data.tags)
  return posts
    .filter((p) => p.id !== currentId)
    .map((p) => ({
      post: p,
      score: p.data.tags.filter((t) => currentTags.has(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post)
}

/** Word count and reading time estimate */
export function getReadingTime(body: string | undefined): number {
  if (!body) return 1
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export type TocItem = {
  depth: number
  slug: string
  text: string
}

/** Extract table of contents from post headings */
export async function getToc(post: Post): Promise<TocItem[]> {
  const { headings } = await render(post)
  return headings
    .filter((h) => h.depth >= 2 && h.depth <= 3)
    .map((h) => ({
      depth: h.depth,
      slug: h.slug ?? "",
      text: h.text ?? "",
    }))
}
