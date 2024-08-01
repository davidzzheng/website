'use client'

import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react'

import { Layout } from '@/components/layout'
import { Clipboard } from '@/components/ui/clipboard'

export const ContactView = () => {
  return (
    <Layout>
      <Layout.Main className="space-y-4 bg-background/75 p-6">
        <h1 className="font-bold tracking-tighter ~text-2xl/4xl">Contact</h1>
        <section className="flex items-center gap-x-6">
          <p className="text-base">External Links:</p>
          <a
            className="transition hover:opacity-75"
            href="https://www.linkedin.com/in/davidzzheng/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon size={24} aria-label="LinkedIn" />
          </a>
          <a
            className="transition hover:opacity-75"
            href="https://github.com/davidzzheng"
            target="_blank"
          >
            <GithubIcon size={24} aria-label="Github" />
          </a>
          <Clipboard value="hello@davidzheng.me">
            <MailIcon size={24} aria-label="Email" />
          </Clipboard>
        </section>
      </Layout.Main>
    </Layout>
  )
}
