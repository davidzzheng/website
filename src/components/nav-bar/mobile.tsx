import { useEffect, useState } from 'react'
import { MenuIcon } from 'lucide-react'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type MobileNavBarProps = {
  activeTabIndex: number | null
  setActiveTabIndex: (index: number) => void
}

export const MobileNavBar = ({ activeTabIndex, setActiveTabIndex }: MobileNavBarProps) => {
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
