'use client'

import { Layout } from '@/components/layout'
import { cn } from '@/lib/utils'
import type { Technology, Work } from 'payload-types'

type WorkViewProps = {
  positions: Work[]
  projects: Work[]
}

export const WorkView = ({ positions, projects }: WorkViewProps) => {
  const getDate = (date: string) => {
    const dateObj = new Date(date)
    return `${dateObj.getFullYear()}`
  }

  return (
    <Layout>
      <Layout.Main className="mb-16 rounded-lg bg-background/80 p-6">
        {[
          { header: 'Work Experience', items: positions },
          { header: 'Projects', items: projects },
        ].map(({ header, items }) => (
          <div key={header}>
            <h1 className="~text-2xl/4xl mb-3 font-bold tracking-tighter">{header}</h1>
            <section className="mb-12 flex flex-col gap-y-2">
              <div className="flex flex-col gap-y-8">
                {items.map((position) => (
                  <div key={position.id} className="flex flex-col gap-y-2">
                    <div className="flex items-center justify-between">
                      <a
                        href={position.link!}
                        className="~text-lg/2xl underlined font-semibold"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {position.company}
                      </a>
                      <p className="~text-xs/sm">
                        {`${getDate(position.startDate!)} - ${
                          position.endDate ? getDate(position.endDate) : 'Present'
                        }`}
                      </p>
                    </div>
                    <div
                      className={cn(
                        'prose dark:prose-invert mb-2 max-w-full text-foreground',
                        '[&_a]:underlined [&_a]:underlined-blue-500 [&_a]:text-blue-500',
                      )}
                      dangerouslySetInnerHTML={{
                        __html: position.descriptionHtml!,
                      }}
                    />
                    <ul className="flex flex-wrap gap-2">
                      {(position.technologies as Technology[])?.map(({ name }) => (
                        <li
                          key={name}
                          className="cursor-default rounded bg-muted px-1 text-muted-foreground text-sm transition hover:text-foreground"
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ))}
      </Layout.Main>
    </Layout>
  )
}
