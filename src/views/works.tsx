'use client'

import { Layout } from '@/components/layout'
import { Work } from 'payload-types'

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
      <Layout.Main className="space-y-6 rounded-lg bg-background/80 p-6">
        <h1 className="mb-3 font-bold tracking-tighter ~text-2xl/4xl">Work Experience</h1>
        <section className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-6">
            {positions.map((position) => (
              <div key={position.id} className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                  <a
                    href={position.link}
                    className="font-semibold ~text-lg/2xl decorate-underline"
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
                  className="prose text-lg text-foreground dark:prose-invert"
                  dangerouslySetInnerHTML={{
                    __html: position.descriptionHtml!,
                  }}
                />
                <ul className="flex gap-2 justify-end">
                  {position.technologies?.map((tag) => (
                    <li
                      key={tag.name}
                      className="text-sm px-1 rounded bg-muted text-muted-foreground transition hover:text-foreground cursor-default"
                    >
                      {tag.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <h1 className="mb-3 font-bold tracking-tighter ~text-2xl/4xl">Projects</h1>
        <section className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-6">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                  <a
                    href={project.link}
                    className="font-semibold ~text-lg/2xl decorate-underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {project.company}
                  </a>

                  <p className="~text-xs/sm">
                    {`${getDate(project.startDate!)} - ${getDate(project.endDate!)}`}
                  </p>
                </div>
                <div
                  className="prose text-lg text-foreground dark:prose-invert"
                  dangerouslySetInnerHTML={{
                    __html: project.descriptionHtml!,
                  }}
                />
                <ul className="flex gap-2 justify-end">
                  {project.technologies?.map((tag) => (
                    <li
                      key={tag.name}
                      className="text-sm px-1 rounded bg-muted text-muted-foreground transition hover:text-foreground cursor-default"
                    >
                      {tag.name}
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
