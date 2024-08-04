'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

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
  }, [id])

  return (
    <Comp
      id={id}
      className={cn(
        'relative flex items-center cursor-pointer hover:text-muted-foreground transition w-fit',
        "hover:before:content-['#'] before:absolute before:text-muted-foreground before:ml-[-15px] before:~text-sm/lg before:opacity-0 hover:before:opacity-100 before:transition",
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </Comp>
  )
}
