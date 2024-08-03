'use client'

import { useBreakpoint } from '@/hooks/breakpoint'
import { DesktopNavBar } from './desktop'
import { MobileNavBar } from './mobile'

export const NavBar = () => {
  const aboveSm = useBreakpoint('sm')

  return aboveSm ? <DesktopNavBar /> : <MobileNavBar />
}
