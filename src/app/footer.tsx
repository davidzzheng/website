'use client'

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="size-4" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className="size-4" />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <MonitorIcon className="size-4" />,
  },
]

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme: _theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      {THEMES_OPTIONS.map((theme) => {
        return (
          <button
            name="theme"
            key={theme.id}
            className={cn(
              'inline-flex size-7 cursor-pointer items-center justify-center rounded-sm transition-colors duration-100 focus-visible:outline-2 ',
              theme.id === _theme
                ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-700 dark:text-zinc-50'
                : 'text-zinc-500 dark:text-zinc-400',
            )}
            aria-label={`Switch to ${theme.label} theme`}
            onClick={() => setTheme(theme.id)}
          >
            {theme.icon}
          </button>
        )
      })}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-zinc-100 border-t px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-end">
        <div className="text-xs text-zinc-400">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}
