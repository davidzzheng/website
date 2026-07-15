# david zheng

personal site. built with astro 7, deployed to cloudflare workers via alchemy v2.

## stack

- **astro 7** — static site generator
- **tailwind v4** — styling
- **three.js** — particle background (phosphor.ts)
- **alchemy v2** — infrastructure as code (cloudflare workers)
- **bun** — package manager & runtime

## develop

```sh
bun install
bun dev
```

## build

```sh
bun run build
```

## deploy

```sh
bun alchemy deploy
```

## structure

```
src/
  components/  — ui + mdx components
  layouts/     — base layout
  lib/         — content, animations, particle system
  pages/       — routes
  styles/      — global css
data/
  positions/   — work history (markdown)
  projects/    — project entries (mdx)
  posts/       — blog posts (mdx)
```

## license

mit
