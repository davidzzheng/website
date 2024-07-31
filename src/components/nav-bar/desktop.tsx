import { cx } from 'cva'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export const DesktopNavBar = () => {
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

  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex ?? -1]
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0)
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0)
    }

    setTabPosition()
    window.addEventListener('resize', setTabPosition)

    return () => window.removeEventListener('resize', setTabPosition)
  }, [activeTabIndex])

  const tabsRef = useRef<Array<HTMLAnchorElement | null>>([])

  return (
    <div className="flex h-16 w-full items-center justify-between ~px-6/8">
      <div className="flex items-center">
        <Link
          href="/"
          className={cx('decorate-underline ~text-lg/xl font-bold text-foreground', {
            selected: path === '/',
          })}
          aria-label="David Zheng's portfolio website"
        >
          dz
        </Link>
      </div>
      <div className="relative my-4 w-fit">
        <ul className="flex space-x-4">
          {['work', 'blog', 'contact'].map((tab, idx) => (
            <Link
              key={tab}
              ref={(el) => {
                tabsRef.current[idx] = el
              }}
              href={`/${tab}`}
              className="cursor-pointer px-4 py-3 font-semibold text-foreground transition ~text-lg/xl hover:text-muted-foreground"
              onClick={() => setActiveTabIndex(idx)}
              role="listitem"
            >
              {tab}
            </Link>
          ))}
        </ul>
        <span
          className="absolute bottom-0 block h-[3px] bg-primary transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      <div />
    </div>
  )
}
