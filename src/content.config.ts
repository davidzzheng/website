import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const posts = defineCollection({
  loader: glob({ base: "./data/posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    series: z.string().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({ base: "./data/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    year: z.number().optional(),
    link: z.string().optional(),
    prize: z.string().optional(),
    images: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  }),
})

const positions = defineCollection({
  loader: glob({ base: "./data/positions", pattern: "**/*.md" }),
  schema: z.object({
    company: z.string(),
    category: z.enum(["work", "community"]).default("work"),
    description: z.string().optional(),
    end: z
      .union([z.string(), z.date()])
      .optional()
      .transform((v) =>
        v instanceof Date ? v.toISOString().split("T")[0] : v
      ),
    link: z.string(),
    start: z
      .union([z.string(), z.date()])
      .transform((v) =>
        v instanceof Date ? v.toISOString().split("T")[0] : v
      ),
    title: z.string(),
    images: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  }),
})

const board = defineCollection({
  loader: glob({ base: "./data/board", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    type: z.enum(["image", "video", "gif", "website"]),
    media: z.string().optional(),
    embed: z.string().optional(),
    url: z.string().optional(),
    source: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
})

export const collections = { positions, posts, projects, board }
