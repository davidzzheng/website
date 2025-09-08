import type { NextConfig } from "next"
import { withContentlayer } from "next-contentlayer"

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
} as NextConfig

export default withContentlayer(nextConfig)
