'use client'

import { motion } from 'motion/react'

import ScrambleText from '@/components/ui/scramble-text'
import { TRANSITION_SECTION, VARIANTS_CONTAINER, VARIANTS_SECTION } from '@/lib/animation'
import { EMAIL, GITHUB, LINKEDIN } from '@/lib/constants'

export default function () {
  return (
    <motion.main className="space-y-20" variants={VARIANTS_CONTAINER} initial="hidden" animate="visible">
      <ScrambleText as="h1" className="mb-8 font-bold text-2xl" text="Contact" />
      <motion.section variants={VARIANTS_SECTION} transition={{ ...TRANSITION_SECTION, delay: 0.5 }}>
        <div className="rounded-lg bg-zinc-100 p-8 dark:bg-zinc-900/80">
          <p className="mb-5 text-zinc-600 dark:text-zinc-400">
            Feel free to contact me at{' '}
            <a className="underlined dark:text-zinc-300" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
          <div className="flex items-center justify-start space-x-3">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              GitHub
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.section>
    </motion.main>
  )
}
