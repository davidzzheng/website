'use client'

import type React from 'react'
import { ThemeProvider } from 'next-themes'

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" themes={['dark']} enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}
