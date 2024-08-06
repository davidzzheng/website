import { withPlausibleProxy } from 'next-plausible'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.GHOST_URL,
      },
    ],
  },
}

export default withPlausibleProxy()(nextConfig)
