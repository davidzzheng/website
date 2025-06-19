import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Footer } from './footer'
import { Header } from './header'

import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://davidzheng.me/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'david zheng',
    template: 'dz | %s',
  },
  description: "David Zheng's personal website",
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(geist.variable, geistMono.variable, 'bg-white tracking-tight antialiased dark:bg-neutral-950')}
      >
        <ThemeProvider enableSystem={true} attribute="class" storageKey="theme" defaultTheme="system">
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
