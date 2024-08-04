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

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4')).map((elem) => ({
      id: elem.id,
      title: elem.textContent ?? '',
      level: Number(elem.nodeName.charAt(1)),
    }))

    const nestedHeadings = getNestedHeadings(elements)
    setHeadings(nestedHeadings)
  }, [])

  useEffect(() => {
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

    const headingElements = document.querySelectorAll('h2, h3, h4, h5, h6')
    headingElements.forEach((element) => observer.observe(element))

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
      <ul className="flex flex-col gap-y-4 mb-4">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToHeading(heading.id)
              }}
              className={cn(
                'w-fit decorate-underline text-sm leading-6',
                heading.id === activeId ? 'selected font-medium' : '',
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
                        'ml-4 w-fit decorate-underline text-sm leading-6',
                        child.id === activeId ? 'selected font-medium' : '',
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
      <div className={cn('transition origin-top scale-y-0', activeId ? 'scale-y-100' : '')}>
        <ScrollToTop variant="ghost" className="w-full" size="sm" />
      </div>
    </nav>
  )
}
