'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import ScrambleText from '@/components/ui/scramble-text'
import { cn } from '@/lib/utils'

export const Header = () => {
  const pathname = usePathname()
  const links = [
    {
      label: 'Work',
      href: '/work',
      regex: /work/,
    },
    {
      label: 'Posts',
      href: '/posts',
      regex: /posts/,
    },
    {
      label: 'Contact',
      href: '/contact',
      regex: /contact/,
    },
  ]
  return (
    <nav className="mb-4 flex items-center justify-between">
      <Link href="/" className={cn('underlined py-2 font-bold text-black dark:text-white')}>
        <ScrambleText text="David Zheng" />
      </Link>

      <div className="flex items-center justify-center gap-8">
        {links.map(({ label, href, regex }, i, arr) => {
          const isActive = regex.test(pathname)
          return (
            <Link
              key={label}
              href={href}
              className={cn('underlined py-2 text-black dark:text-white', isActive && 'underlined-active')}
            >
              <ScrambleText text={label} delay={250 * (arr.length - i)} />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
