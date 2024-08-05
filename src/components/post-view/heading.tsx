'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { cn } from '@/lib/utils'

type HeadingProps = {
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  id: string
  children: React.ReactNode
  className?: string
}

export const Heading = ({ heading, id, children, className }: HeadingProps) => {
  const Comp = heading
  const router = useRouter()

  const handleClick = useCallback(async () => {
    router.replace(`#${id}`, { scroll: false })

    const url = window.location.href.replace(/#.*$/, `#${id}`)
    await navigator.clipboard.writeText(url)
  }, [id, router])

  return (
    <Comp
      id={id}
      className={cn(
        'relative flex w-fit cursor-pointer items-center transition hover:text-muted-foreground',
        'before:~text-sm/lg before:absolute before:ml-[-15px] before:text-muted-foreground before:opacity-0 before:transition hover:before:opacity-100 hover:before:content-["#"]',
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </Comp>
  )
}
