import tailwindConfig from '@tailwind-config'
import { useEffect, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'

const fullConfig = resolveConfig(tailwindConfig)

const breakpoints = fullConfig.theme.screens

type BreakpointKey = keyof typeof breakpoints

const getBreakpointValue = (breakpoint: string) => Number.parseInt(breakpoint.replace(/[^\d]/g, ''), 10)

export const useBreakpoint = (breakpoint: BreakpointKey) => {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`)

      const updateMatch = (e: MediaQueryListEvent) => {
        setIsAboveBreakpoint(e.matches)
      }

      setIsAboveBreakpoint(mediaQuery.matches)

      mediaQuery.addEventListener('change', updateMatch)

      return () => mediaQuery.removeEventListener('change', updateMatch)
    }
  }, [breakpoint])

  return isAboveBreakpoint
}

const getOrderedBreakpoints = () => {
  return (Object.keys(breakpoints) as BreakpointKey[]).sort(
    (a, b) => getBreakpointValue(breakpoints[a]) - getBreakpointValue(breakpoints[b]),
  )
}

export const useActiveBreakpoint = () => {
  const orderedBreakpoints = getOrderedBreakpoints()
  const breakpointResults = orderedBreakpoints.map((breakpoint) => ({
    breakpoint,
    isActive: useBreakpoint(breakpoint),
  }))

  const activeBreakpoints = breakpointResults.filter(({ isActive }) => isActive)
  return activeBreakpoints.length > 0
    ? activeBreakpoints[activeBreakpoints.length - 1].breakpoint
    : null
}
