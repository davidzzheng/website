import GhostContentAPI from '@tryghost/content-api'

export const ghost = GhostContentAPI({
  url: process.env.GHOST_URL!,
  key: process.env.GHOST_KEY!,
  version: 'v5.0',
  makeRequest: async ({ url, method, params, headers }) => {
    const apiUrl = new URL(url)

    Object.keys(params).map((key) => apiUrl.searchParams.set(key, params[key]))

    const res = await fetch(apiUrl.toString(), { method, headers })
    return { data: await res.json() }
  },
})

export type Post = Awaited<ReturnType<typeof ghost.posts.read>>

export type Tag = Awaited<ReturnType<typeof ghost.tags.read>>
