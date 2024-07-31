'use client'

import { DesktopNavBar } from './desktop'
import { MobileNavBar } from './mobile'
import { useBreakpoint } from '@/hooks/breakpoint'

export const NavBar = () => {
  const aboveSm = useBreakpoint('sm')

  return !aboveSm ? <MobileNavBar /> : <DesktopNavBar />
}
