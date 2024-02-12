"use client"

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion"
import { GithubIcon, LinkedinIcon } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <main className="max-w-[840px] mx-auto">
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          <div className="flex flex-col gap-y-4 text-2xl font-medium leading-relaxed">
            <m.p
              initial={{ opacity: 0, y: 50, lineHeight: 3 }}
              animate={{ opacity: 1, y: 0, lineHeight: 2 }}
              transition={{ delay: 0.25, duration: 2 / 3, type: "spring" }}
            >
              My name is David Zheng. I&apos;m a hobbyist programmer turned
              professional software engineer based out of Vancouver, Canada.
            </m.p>

            <m.p
              initial={{ opacity: 0, y: 50, lineHeight: 3 }}
              animate={{ opacity: 1, y: 0, lineHeight: 2 }}
              transition={{ delay: 0.5, duration: 2 / 3, type: "spring" }}
            >
              I currently specialize in building scalable frontend applications
              with an emphasis on user experience & accessibility. My primary
              stack is React with Next.js, TypeScript, and TailwindCSS, but I am always open
              to learning new{" "}
              <Link href="/work" className="link">
                technologies & paradigms
              </Link>.
            </m.p>

            <m.p
              initial={{ opacity: 0, y: 50, lineHeight: 3 }}
              animate={{ opacity: 1, y: 0, lineHeight: 2 }}
              transition={{ delay: 0.75, duration: 2 / 3, type: "spring" }}
            >
              In my spare time, I enjoying diving deep into topics like cryptocurrencies & artificial
              intelligence, experimenting  and write about them on my{" "}
              <Link href="/notes" className="link">
                blog
              </Link>
              .
            </m.p>


            <m.p
              initial={{ opacity: 0, y: 50, lineHeight: 3 }}
              animate={{ opacity: 1, y: 0, lineHeight: 2 }}
              transition={{ delay: 1, duration: 2 / 3, type: "spring" }}
              className="flex gap-x-6 items-center mt-4"
            >
              <p className="text-base">External Links:</p>
              <a className="hover:scale-125 transition-transform" href="https://www.linkedin.com/in/davidzzheng/" target="_blank"><LinkedinIcon size={24} aria-label="LinkedIn" /></a>
              <a className="hover:scale-125 transition-transform" href="https://github.com/davidzzheng" target="_blank"><GithubIcon size={24} aria-label="Github" /></a>
            </m.p>
          </div>
        </AnimatePresence>
      </LazyMotion>


    </main>
  )
}
