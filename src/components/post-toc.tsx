'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ScrollToTop } from './scroll-to-top'

type Heading = {
  id: string
  title: string
  items?: Heading[]
}

const getNestedHeadings = (
  headingElements: Array<{ id: string; title: string; level: number }>,
): Heading[] => {
  const nestedHeadings: Heading[] = []

  headingElements.forEach(({ id, title, level }) => {
    if (level === 2) {
      nestedHeadings.push({ id, title, items: [] })
    } else if (level === 3 && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items?.push({ id, title })
    }
  })

  return nestedHeadings
}

export const PostTableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>()
  const router = useRouter()

  const queryForHeadings = () => document.querySelectorAll('h1, h2, h3, h4, h5, h6')

  useEffect(() => {
    const headingQuery = queryForHeadings()
    const elements = Array.from(headingQuery).map((elem) => ({
      id: elem.id,
      title: elem.textContent ?? '',
      level: Number(elem.nodeName.charAt(1)),
    }))

    const nestedHeadings = getNestedHeadings(elements)
    setHeadings(nestedHeadings)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0% 0% -80% 0%' },
    )

    headingQuery.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const scrollToHeading = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({
      behavior: 'smooth',
    })
    router.replace(`#${id}`, { scroll: false })
  }

  return (
    <nav aria-label="Table of contents">
      <ul className="mb-4 flex flex-col gap-y-4">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToHeading(heading.id)
              }}
              className={cn(
                'underlined w-fit text-sm leading-6',
                heading.id === activeId ? 'underlined-active font-medium' : '',
              )}
            >
              {heading.title}
            </a>
            {heading.items?.length ? (
              <ul className="mt-4 flex flex-col gap-y-4">
                {heading.items.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToHeading(child.id)
                      }}
                      className={cn(
                        'underlined ml-4 w-fit text-sm leading-6',
                        child.id === activeId ? 'underlined-active font-medium' : '',
                      )}
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
      <div className={cn('flex origin-top scale-y-0 transition', activeId ? 'scale-y-100' : null)}>
        <ScrollToTop variant="ghost" size="sm" />
      </div>
    </nav>
  )
}
