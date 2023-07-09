"use client"

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion"
import Link from "next/link"

export default function About() {
  return (
    <main>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          <div className="mx-auto flex max-w-[840px] flex-col gap-y-4 text-2xl font-medium leading-relaxed">
            <m.p
              initial={{ opacity: 0, y: 50, lineHeight: 3 }}
              animate={{ opacity: 1, y: 0, lineHeight: 2 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              My name is David Zheng. I&apos;m a hobbyist programmer turned
              professional software engineer based out of Vancouver, BC, Canada.
              I am currently working at a company called{" "}
              <a
                href="https://abnormalsecurity.com/"
                target="_blank"
                className="link"
              >
                Abnormal Security
              </a>
              , an AI-powered cloud security platform.
            </m.p>

            <m.p
              initial={{ opacity: 0, y: 50, lineHeight: 3 }}
              animate={{ opacity: 1, y: 0, lineHeight: 2 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              I started programming when I was 12 years old. And ever since
              then, I&apos;ve continued to learn different subjects within the
              field, having worked on various projects that span the entire
              spectrum.
            </m.p>

            <m.p
              initial={{ opacity: 0, y: 50, lineHeight: 3 }}
              animate={{ opacity: 1, y: 0, lineHeight: 2 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              In my spare time, I research topics such as artificial
              intelligence, cybersecurity, cryptocurrency, and any other topic
              that interests me, and write about them on my{" "}
              <Link href="/notes" className="link">
                blog
              </Link>
              .
            </m.p>
          </div>
        </AnimatePresence>
      </LazyMotion>
    </main>
  )
}
