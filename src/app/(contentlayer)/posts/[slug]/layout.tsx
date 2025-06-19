import type { ReactNode } from 'react'

import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600"
        springOptions={{
          bounce: 0,
        }}
      />

      <main>{children}</main>
    </>
  )
}
