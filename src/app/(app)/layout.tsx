import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import type React from 'react'

import { NavBar } from '@/components/nav-bar'
import { cn } from '@/lib/utils'
import { Providers } from './providers'

import './globals.scss'

const Background = dynamic(() => import('../../components/background'))

export const metadata: Metadata = {
  title: {
    template: "%s | David Zheng's Portfolio",
    default: "Home | David Zheng's Portfolio",
  },
  description: 'Ramblings about tech and stuff.',
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  },
  manifest: '/site.webmanifest',
}

const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const fontMono = localFont({
  src: [
    {
      path: '../../../public/fonts/CommitMono-400-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/CommitMono-700-Regular.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/CommitMono-400-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/CommitMono-700-Italic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-mono',
})

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleProvider
          domain="davidzheng.me"
          customDomain="http://analytics.davidzheng.me"
          trackOutboundLinks
          selfHosted
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Providers>
          <NavBar />
          {children}
          <div className="-z-50 fixed top-0 h-screen w-screen">
            <Background />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export default Layout
