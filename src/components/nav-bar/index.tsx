'use client'

import { useBreakpoint } from '@/hooks/breakpoint'
import { useEffect, useState } from 'react'
import { DesktopNavBar } from './desktop'
import { MobileNavBar } from './mobile'

export const NavBar = () => {
  const [isMounted, setIsMounted] = useState(false)
  const aboveSm = useBreakpoint('sm')

  useEffect(() => setIsMounted(true), [])

  return isMounted && !aboveSm ? <MobileNavBar /> : <DesktopNavBar />
}
