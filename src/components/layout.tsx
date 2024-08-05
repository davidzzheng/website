import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type LayoutNodeProps = {
  children: ReactNode
  className?: string
}

export const Layout = ({ children, className }: LayoutNodeProps) => {
  return (
    <div className={cn('container px-2', className)}>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 px-1 sm:grid-cols-12">
        {children}
      </div>
    </div>
  )
}

const LayoutTop = ({ children, className }: LayoutNodeProps) => (
  <section className={cn('sm:col-span-9 sm:col-start-1 md:col-span-8 md:col-start-3', className)}>
    {children}
  </section>
)

const LayoutLeft = ({ children, className }: LayoutNodeProps) => (
  <section className={cn('hidden sm:col-span-3 sm:block md:col-span-2', className)}>
    {children}
  </section>
)

const LayoutRight = ({ children, className }: LayoutNodeProps) => (
  <section className={cn('sm:col-span-3 sm:col-start-10 md:col-span-2 md:col-start-11', className)}>
    {children}
  </section>
)

const LayoutMain = ({ children, className }: LayoutNodeProps) => (
  <section
    className={cn(
      'sm:col-span-9 sm:col-start-1 md:col-span-8 md:col-start-3',
      'row-start-2',
      className,
    )}
  >
    {children}
  </section>
)

export const LayoutBottom = ({ children, className }: LayoutNodeProps) => (
  <section
    className={cn(
      'sm:col-span-9 sm:col-start-1 md:col-span-8 md:col-start-3',
      'row-start-3',
      className,
    )}
  >
    {children}
  </section>
)

Layout.Top = LayoutTop
Layout.Left = LayoutLeft
Layout.Right = LayoutRight
Layout.Main = LayoutMain
Layout.Bottom = LayoutBottom
