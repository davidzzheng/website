'use client'

import { Layout } from '@/components/layout'
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
        <h1 className="~text-2xl/4xl mb-3 font-bold tracking-tighter">Work Experience</h1>
        <section className="mb-12 flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-6">
            {positions.map((position) => (
              <div key={position.id} className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                  <a
                    href={position.link!}
                    className="~text-lg/2xl decorate-underline font-semibold"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {position.company}
                  </a>
                  <p className="~text-xs/sm">
                    {`${getDate(position.startDate!)} - ${getDate(position.endDate!)}`}
                  </p>
                </div>
                <div
                  className="prose dark:prose-invert max-w-full text-foreground"
                  dangerouslySetInnerHTML={{
                    __html: position.descriptionHtml!,
                  }}
                />
                <ul className="flex flex-wrap gap-2">
                  {position.technologies?.map((tag) => (
                    <li
                      key={(tag as Technology).name}
                      className="cursor-default rounded bg-muted px-1 text-muted-foreground text-sm transition hover:text-foreground"
                    >
                      {(tag as Technology).name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <h1 className="~text-2xl/4xl mb-3 font-bold tracking-tighter">Projects</h1>
        <section className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-6">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                  <a
                    href={project.link!}
                    className="~text-lg/2xl decorate-underline font-semibold"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {project.company}
                  </a>

                  <p className="~text-xs/sm">
                    {`${getDate(project.startDate!)} - ${
                      project.endDate ? getDate(project.endDate) : 'Present'
                    }`}
                  </p>
                </div>
                <div
                  className="prose dark:prose-invert max-w-full text-foreground"
                  dangerouslySetInnerHTML={{
                    __html: project.descriptionHtml!,
                  }}
                />
                <ul className="flex flex-wrap gap-2">
                  {project.technologies?.map((tag) => (
                    <li
                      key={(tag as Technology).name}
                      className="cursor-default rounded bg-muted px-1 text-muted-foreground text-sm transition hover:text-foreground"
                    >
                      {(tag as Technology).name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Layout.Main>
    </Layout>
  )
}
