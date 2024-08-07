'use client'

import Link from 'next/link'

import { BlurFade } from '@/components/blur-fade'
import { Layout } from '@/components/layout'

export const HomeView = () => {
  return (
    <Layout>
      <Layout.Main className="rounded-lg bg-background/75 p-8">
        <section id="header" className="flex flex-col gap-y-6">
          <BlurFade delay={0.25} inView>
            <h2 className="~text-3xl/6xl font-bold tracking-tighter">
              Hello{' '}
              <span className="direction-reverse w-fit animate-text-gradient bg-[length:200%] bg-gradient-to-r from-30% from-blue-400 via-70% via-green-500 to-blue-400 bg-clip-text font-bold text-transparent leading-none transition-[background-position]">
                World
              </span>{' '}
              👋
            </h2>
          </BlurFade>
          <BlurFade delay={0.25 * 1} inView>
            <span className="~text-sm/lg text-pretty">
              I'm David Zheng, a Vancouver-based software developer with a passion for coding that
              began at age 12. My self-taught journey has led me through diverse areas of
              programming, from web development to robotics.{' '}
            </span>
          </BlurFade>
          <BlurFade delay={0.25 * 2} inView>
            <span className="~text-sm/lg text-pretty">
              With over 5 years of{' '}
              <Link href="/work" className="underlined underlined-blue-500 text-blue-500">
                professional experience
              </Link>
              , I've honed my skills in building scalable full-stack web applications for both
              high-growth startups and enterprise-level companies. These days I work primarily on
              the frontend, but I am equally as capable working across the entire stack. I am always
              eager to explore and learn new technologies and paradigms in the ever-evolving world
              of software development.
            </span>
          </BlurFade>
          <BlurFade delay={0.25 * 3} inView>
            <span className="~text-sm/lg text-pretty">
              I also enjoy diving deep into novel technical topics like cryptocurrencies and
              artificial intelligence, experimenting with them, and writing about them on my{' '}
              <Link href="/blog" className="underlined underlined-blue-500 text-blue-500">
                blog
              </Link>
              .
            </span>
          </BlurFade>
          <BlurFade delay={0.25 * 4} inView>
            <span className="~text-sm/lg text-pretty">
              If you are interested in working with me, want to learn more about something I&apos;ve
              written about, or just want to say hello, feel free to{' '}
              <Link href="/contact" className="underlined underlined-blue-500 text-blue-500">
                reach out
              </Link>
              .
            </span>
          </BlurFade>
        </section>
      </Layout.Main>
    </Layout>
  )
}
