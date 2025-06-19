'use client'

import { format } from 'date-fns'
import { motion } from 'motion/react'
import Link from 'next/link'

import { AnimatedBackground, AnimatedBackgroundItem } from '@/components/ui/animated-background'
import { TRANSITION_SECTION, VARIANTS_CONTAINER, VARIANTS_SECTION } from '@/lib/animation'
import { EMAIL } from '@/lib/constants'
import { formatMonthYear } from '@/lib/date'
import { latestPosts, positions } from '@/lib/data'

export default function () {
  return (
    <motion.main className="space-y-20" variants={VARIANTS_CONTAINER} initial="hidden" animate="visible">
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="flex-1">
          <p className="text-zinc-600 dark:text-zinc-400">
            Self-taught software developer with a passion for the cutting edge. Creating unique experiences that bridge
            tomorrow's technologies with the contemporary web.
          </p>
        </div>
      </motion.section>
      <AnimatedBackground
        enableHover
        className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.2,
        }}
      >
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <Link href="/work" className="underlined mb-3 font-medium text-lg">
            Work
          </Link>
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
        </motion.section>

        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <Link href="/posts" className="underlined mb-3 font-medium text-lg">
            Posts
          </Link>
          <div className="flex flex-col space-y-1">
            {latestPosts.map((post, idx) => (
              <AnimatedBackgroundItem id={post._id} key={idx}>
                <Link href={post.url} className="underlined font-bold text-lg">
                  {post.title}
                </Link>
                {post.description ? <p>{post.description}</p> : null}
                <time dateTime={post.date} className="my-1 block text-gray-600 text-xs">
                  {format(post.date, 'LLLL d, yyyy')}
                </time>
              </AnimatedBackgroundItem>
            ))}
          </div>
        </motion.section>
      </AnimatedBackground>

      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <Link href="/contact" className="underlined mb-3 font-medium text-lg">
          Contact
        </Link>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          Feel free to contact me at{' '}
          <a className="underlined dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3"></div>
      </motion.section>
    </motion.main>
  )
}
