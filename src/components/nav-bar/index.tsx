'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import { DesktopNavBar } from './desktop'
import { MobileNavBar } from './mobile'
import { useBreakpoint } from '@/hooks/breakpoint'

export const NavBar = () => {
  const path = usePathname()
  const initialIndex = (() => {
    switch (path.split('/')[1]) {
      case 'work':
        return 0
      case 'blog':
      case 'topics':
        return 1
      case 'contact':
        return 2
      default:
        return null
    }
  })()
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(initialIndex)

  useEffect(() => {
    if (activeTabIndex !== initialIndex) {
      setActiveTabIndex(initialIndex)
    }
  }, [activeTabIndex, initialIndex, path])

  const aboveSm = useBreakpoint('sm')

  return aboveSm ? (
    <DesktopNavBar activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
  ) : (
    <MobileNavBar activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
  )
}
