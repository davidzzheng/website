'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

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
  const [activeId, setActiveId] = useState<string>('')

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

    const headingElements = document.querySelectorAll('h2, h3, h4')
    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <nav aria-label="Table of contents">
      <ul className="flex flex-col gap-y-4">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              className={cn(
                'w-fit decorate-underline text-sm',
                heading.id === activeId ? 'selected font-semibold' : '',
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
                        document.querySelector(`#${child.id}`)?.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }}
                      className={cn(
                        'ml-4 w-fit decorate-underline text-sm',
                        child.id === activeId ? 'selected font-semibold' : '',
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
    </nav>
  )
}
