"use client"

import { format } from "date-fns"
import * as motion from "motion/react-m"
import Link from "next/link"

import {
  AnimatedBackground,
  AnimatedBackgroundItem,
} from "@/components/ui/animated-background"
import ScrambleText from "@/components/ui/scramble-text"
import {
  TRANSITION_SECTION,
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
} from "@/lib/animation"
import { latestPosts } from "@/lib/data"

export default function () {
  return (
    <motion.main
      animate="visible"
      className="space-y-20"
      initial="hidden"
      variants={VARIANTS_CONTAINER}
    >
      <ScrambleText as="h1" className="mb-8 font-bold text-2xl" text="Posts" />
      <motion.section
        transition={{ ...TRANSITION_SECTION, delay: 0.5 }}
        variants={VARIANTS_SECTION}
      >
        <AnimatedBackground
          className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
          enableHover
          transition={{
            type: "spring",
            bounce: 0,
            duration: 0.2,
          }}
        >
          <div className="flex flex-col space-y-4">
            {latestPosts.map((post, idx) => (
              <AnimatedBackgroundItem id={post._id} key={idx}>
                <Link className="underlined font-bold text-lg" href={post.url}>
                  {post.title}
                </Link>
                {post.description ? (
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {post.description}
                  </p>
                ) : null}
                <time
                  className="my-1 block text-gray-600 text-xs"
                  dateTime={post.date}
                >
                  {format(post.date, "LLLL d, yyyy")}
                </time>
              </AnimatedBackgroundItem>
            ))}
          </div>
        </AnimatedBackground>
      </motion.section>
    </motion.main>
  )
}
