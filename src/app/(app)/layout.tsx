import React from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'

import { NavBar } from '@/components/nav-bar'
import { cn } from '@/lib/utils'
import { Providers } from './providers'

import './globals.scss'

const Background = dynamic(() => import('../../components//background'))

export const metadata: Metadata = {
  title: {
    template: "%s | David Zheng's Portfolio",
    default: 'Home',
  },
}

const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers>
          <NavBar />
          {children}
          <div className="fixed top-0 -z-50 h-screen w-screen">
            <Background />
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default Layout
