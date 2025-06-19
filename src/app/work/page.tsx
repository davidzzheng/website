'use client'

import { motion } from 'motion/react'

import { AnimatedBackground, AnimatedBackgroundItem } from '@/components/ui/animated-background'
import ScrambleText from '@/components/ui/scramble-text'
import { TRANSITION_SECTION, VARIANTS_CONTAINER, VARIANTS_SECTION } from '@/lib/animation'
import { positions } from '@/lib/data'
import { formatMonthYear } from '@/lib/date'

export default function () {
  return (
    <motion.main className="space-y-20" variants={VARIANTS_CONTAINER} initial="hidden" animate="visible">
      <ScrambleText as="h1" className="mb-8 font-bold text-2xl" text="Work Experience" />
      <motion.section variants={VARIANTS_SECTION} transition={{ ...TRANSITION_SECTION, delay: 0.5 }}>
        <AnimatedBackground
          enableHover
          className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.2,
          }}
        >
          <div className="flex flex-col space-y-4">
            {positions.map((position, idx) => (
              <AnimatedBackgroundItem id={position._id} key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={position.logo} alt={position.company} className="size-10 rounded-full" />
                  <div className="flex flex-col">
                    <a href={position.link} target="_blank" className="mb-px font-semibold">
                      <p className="underlined">{position.company}</p>
                    </a>
                    <p className="flex flex-col gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                      <span>{position.title}</span>
                      {formatMonthYear(position.start)} - {formatMonthYear(position.end)}
                    </p>
                  </div>
                </div>
              </AnimatedBackgroundItem>
            ))}
          </div>
        </AnimatedBackground>
      </motion.section>
    </motion.main>
  )
}
