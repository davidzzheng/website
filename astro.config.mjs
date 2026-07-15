import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import preact from "@astrojs/preact"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import rehypePrettyCode from "rehype-pretty-code"
import remarkGfm from "remark-gfm"
import sitemap from "@astrojs/sitemap"

const prettyCodeOptions = {
  theme: { dark: "rose-pine-moon", light: "rose-pine-dawn" },
  keepBackground: false,
}

export default defineConfig({
  site: "https://davidzheng.me",
  integrations: [preact(), react(), mdx(), sitemap()],
  markdown: {
    processor: unified({
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      remarkPlugins: [remarkGfm],
    }),
  },
  prefetch: { defaultStrategy: "hover" },
  vite: {
    build: {
      rollupOptions: { external: ["typescript"] },
    },
    optimizeDeps: { exclude: ["typescript"] },
    plugins: [tailwindcss()],
  },
})
