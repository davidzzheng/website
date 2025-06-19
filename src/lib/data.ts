import { allPositions, allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

export const posts = allPosts.filter((post) => process.env.NODE_ENV !== 'production' || post.isPublished)

export const latestPosts = posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))).slice(0, 3)

export const positions = allPositions.sort((a, b) => compareDesc(new Date(a.start), new Date(b.start)))
