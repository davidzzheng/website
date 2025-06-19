'use client'

import { format } from 'date-fns'
import { motion } from 'motion/react'
import Link from 'next/link'

import { AnimatedBackground, AnimatedBackgroundItem } from '@/components/ui/animated-background'
import ScrambleText from '@/components/ui/scramble-text'
import { TRANSITION_SECTION, VARIANTS_CONTAINER, VARIANTS_SECTION } from '@/lib/animation'
import { latestPosts } from '@/lib/data'

export default function () {
  return (
    <motion.main className="space-y-20" variants={VARIANTS_CONTAINER} initial="hidden" animate="visible">
      <ScrambleText as="h1" className="mb-8 font-bold text-2xl" text="Posts" />
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
            {latestPosts.map((post, idx) => (
              <AnimatedBackgroundItem id={post._id} key={idx}>
                <Link href={post.url} className="underlined font-bold text-lg">
                  {post.title}
                </Link>
                {post.description ? <p className="mt-2 text-zinc-600 dark:text-zinc-400">{post.description}</p> : null}
                <time dateTime={post.date} className="my-1 block text-gray-600 text-xs">
                  {format(post.date, 'LLLL d, yyyy')}
                </time>
              </AnimatedBackgroundItem>
            ))}
          </div>
        </AnimatedBackground>
      </motion.section>
    </motion.main>
  )
}
