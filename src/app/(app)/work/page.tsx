import type { Metadata } from 'next'

import { getPayload } from '@/lib/payload'
import { WorkView } from '@/views/works'
import type { Work } from 'payload-types'

const positions = [
  {
    company: 'Abnormal Security',
    link: 'https://abnormalsecurity.com',
    description:
      'Abnormal Security is a cybersecurity company that uses artificial intelligence to detect and respond to cloud-based threats. At Abnormal I helped build the frontend for some of their newer products, with the main objective of being to transform the company from a strictly email security to a broader cloud security platform.',
    startDate: '2022-10-01',
    endDate: '2023-08-01',
    workType: 'fulltime',
    technologies: [
      {
        name: 'TypeScript',
      },
      {
        name: 'React',
      },
      {
        name: 'TailwindCSS',
      },
      {
        name: 'Webpack',
      },
      {
        name: 'Vite',
      },
      {
        name: 'Python',
      },
      {
        name: 'Kafka',
      },
      {
        name: 'OpenSearch',
      },
    ],
  },
  {
    company: 'Deliverr',
    link: 'https://deliverr.com',
    description:
      'Deliverr is a logistics company that helps e-commerce businesses fulfill orders faster by providing them with a network of warehouses across the United States. At Deliverr I worked across the tech stack, implementing frontend features that would help streamline our warehouse operations, as well as backend integrations with our last-mile carrier partners.',
    startDate: '2021-04-01',
    endDate: '2022-10-01',
    workType: 'fulltime',
    technologies: [
      {
        name: 'TypeScript',
      },
      {
        name: 'React',
      },
      {
        name: 'Express',
      },
      {
        name: 'Storybook',
      },
    ],
  },
  {
    company: 'Workday',
    link: 'https://workday.com',
    description: (
      <>
        <p>
          Workday is a cloud-based financial management and human capital management software
          company used by large enterprises all over the world. At Workday I worked with a team that
          had gotten acquired to help build their{' '}
          <a href="https://www.workday.com/en-ca/products/talent-management/talent-optimization.html">
            talent marketplace platform
          </a>{' '}
          within the Workday monolith.
        </p>
        <p>
          I also helped prove out the usage of JavaScript & React within our product pillar, paving
          the way for future projects to use modern web technologies instead of the XML-based
          service that powers the rest of Workday.
        </p>
      </>
    ),
    startDate: '2018-08-01',
    endDate: '2021-08-01',
  },
]

const projects = [
  {
    company: 'blockspace.',
    link: 'https://blockspace.so',
    description:
      'blockspace is a project that aims to turn any web link into a collectible. OpenGraph and OEmbed metadata are used to create a digital collectible stored as a compressed non-fungible token on the Solana blockchain. The platform is built as a Next.js PWA, with an events-driven backend powered by Fastify, Postgres, Redis, and Temporal. The platform is currently in closed alpha.',
    startDate: '2023-12-01',
    technologies: [
      {
        name: 'TypeScript',
      },
      {
        name: 'React',
      },
      {
        name: 'Next.js',
      },
      {
        name: 'TailwindCSS',
      },
      {
        name: 'Postgres',
      },
      {
        name: 'Redis',
      },
      {
        name: 'Temporal',
      },
      {
        name: 'Fastify',
      },
      {
        name: 'IPFS',
      },
    ],
  },
  {
    company: 'AssistList',
    link: 'https://assistlist.ca',
    startDate: '2017-12-01',
    endDate: '2018-12-01',
    description:
      'AssistList is a non-profit organization based out of Vancouver, Canada that facilitates in the exchange and sale of second-hand medical equipment. Originally a Rails monolithic application, AssistList’s frontend was re-implemented as a React single page application to handle the increasingly complex user flows, as well as to adopt the modern standards in web development such as component-based architecture.',
    technologies: [
      {
        name: 'React',
      },
      {
        name: 'Ruby on Rails',
      },
    ],
  },
  {
    company: 'Penguin Robotics',
    link: 'https://penguinrobotics.ca',
    startDate: '2014-12-01',
    endDate: '2018-12-01',
    description:
      'Penguin Robotics is a non-profit organization that runs local robotics competitions and workshops for high school students. Founded by graduating students from one of the top high school robotics program in the world, our goal is to to proliferate the knowledge and skills we had built up over the years to other students and ensure that our region remained competitive on the world stage.',
  },
  {
    company: 'Gladstone Robosavages',
    link: 'https://www.facebook.com/GladstoneRobosavages/',
    startDate: '2013-09-01',
    endDate: '2014-07-01',
    description: (
      <>
        <p>
          Gladstone Robosavages were a high school robotics team that competed in VEX Robotics
          competitions. Originally started as an electronics class, the program quickly grew into a
          world-class robotics program that has won numerous awards and accolades at the
          international level.
        </p>
        <p>
          During my time there, I lead a team to a world championship qualification spot as a
          first-time captain/driver in the world's most competitive region. I also helped push
          forward software-oriented solutions that took advantage of the sensors that were available
          to us, and open-sourced our code for our underclassmen to learn from and build upon after
          we graduated.
        </p>
      </>
    ),
  },
]

export const metadata: Metadata = {
  title: 'Work',
}

export default async function WorkPage() {
  const payload = await getPayload()

  const { docs: works } = await payload.find({
    collection: 'work',
    sort: '-startDate',
  })

  // Object.groupBy is not supported on Vercel yet (needs Node 21)
  // const { fulltime: positions = [], project: projects = [] } = Object.groupBy(
  // 	works,
  // 	(work) => work.workType!,
  // )

  const { fulltime: positions = [], project: projects = [] } = works.reduce<{
    fulltime: Work[]
    project: Work[]
  }>(
    (acc, work) => {
      if (work.workType === 'fulltime') {
        acc.fulltime.push(work)
      } else if (work.workType === 'project') {
        acc.project.push(work)
      }
      return acc
    },
    { fulltime: [], project: [] },
  )

  return <WorkView positions={positions} projects={projects} />
}
