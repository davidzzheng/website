#!/usr/bin/env bun
/**
 * Create a new blog post scaffold.
 * Usage: bun run scripts/new-post.ts "My Post Title" [--tag tag1 --tag tag2]
 */
import { writeFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"

const title = process.argv[2]
if (!title) {
  console.error("Usage: bun run scripts/new-post.ts \"My Post Title\" [--tag tag1]")
  process.exit(1)
}

// Parse --tag flags
const tags: string[] = []
for (let i = 3; i < process.argv.length; i++) {
  if (process.argv[i] === "--tag" && process.argv[i + 1]) {
    tags.push(process.argv[i + 1]!)
    i++
  }
}

// Slugify: lowercase, hyphenated, strip special chars
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-")

const dir = join(process.cwd(), "data", "posts")
const filepath = join(dir, `${slug}.mdx`)

if (existsSync(filepath)) {
  console.error(`Already exists: ${filepath}`)
  process.exit(1)
}

mkdirSync(dir, { recursive: true })

const date = new Date().toISOString().split("T")[0]!

const frontmatter = [
  "---",
  `title: "${title}"`,
  `description: ""`,
  `date: ${date}`,
  `draft: true`,
  tags.length > 0 ? `tags: [${tags.map((t) => `"${t}"`).join(", ")}]` : `tags: []`,
  "---",
  "",
].join("\n")

writeFileSync(filepath, frontmatter)
console.log(`Created: ${filepath}`)
