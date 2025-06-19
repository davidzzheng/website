import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  output: 'export',
} as NextConfig

export default withContentlayer(nextConfig)
