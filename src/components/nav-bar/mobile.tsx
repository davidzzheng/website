import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export const MobileNavBar = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  let scrollingTimer: number | null = null

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolling(true)

      if (scrollingTimer !== null) {
        window.clearTimeout(scrollingTimer)
      }

      scrollingTimer = window.setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollingTimer !== null) {
        window.clearTimeout(scrollingTimer)
      }
    }
  }, [])

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            rounded
            className={cn('transition-opacity', isScrolling ? 'opacity-50' : '')}
          >
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-8">
          <DropdownMenuItem asChild className="text-lg p-2">
            <Link href="/">Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="text-lg p-2">
            <Link href="/work">Work</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="text-lg p-2">
            <Link href="/blog">Blog</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="text-lg p-2">
            <Link href="/contact">Contact</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
