"use client"

import { format } from "date-fns"
import * as motion from "motion/react-m"
import Link from "next/link"

import {
  AnimatedBackground,
  AnimatedBackgroundItem,
} from "@/components/ui/animated-background"
import {
  TRANSITION_SECTION,
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
} from "@/lib/animation"
import { EMAIL } from "@/lib/constants"
import { latestPosts, positions } from "@/lib/data"
import { formatMonthYear } from "@/lib/date"

export default function () {
  return (
    <motion.main
      animate="visible"
      className="space-y-20"
      initial="hidden"
      variants={VARIANTS_CONTAINER}
    >
      {/* <motion.section */}
      {/*   transition={TRANSITION_SECTION} */}
      {/*   variants={VARIANTS_SECTION} */}
      {/* > */}
      {/*   <div className="flex-1"> */}
      {/*     <p className="text-zinc-600 dark:text-zinc-400"> */}
      {/*       Self-taught software developer with specialization on the frontend. */}
      {/*     </p> */}
      {/*   </div> */}
      {/* </motion.section> */}
      <AnimatedBackground
        className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
        enableHover
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.2,
        }}
      >
        <motion.section
          transition={TRANSITION_SECTION}
          variants={VARIANTS_SECTION}
        >
          <Link className="underlined mb-3 font-medium text-lg" href="/work">
            Work
          </Link>
          <div className="flex flex-col space-y-4">
            {positions.map((position, idx) => (
              <AnimatedBackgroundItem
                className="flex items-center justify-between"
                id={position._id}
                key={idx}
              >
                <div className="flex items-center space-x-2">
                  <img
                    alt={position.company}
                    className="size-10 rounded-full"
                    src={position.logo}
                  />
                  <div className="flex flex-col">
                    <a
                      className="underlined mb-px w-fit font-semibold"
                      href={position.link}
                      target="_blank"
                    >
                      {position.company}
                    </a>
                    <p className="flex flex-col gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                      <span>{position.title}</span>
                      {formatMonthYear(position.start)} -{" "}
                      {position.end ? formatMonthYear(position.end) : "Present"}
                    </p>
                  </div>
                </div>
              </AnimatedBackgroundItem>
            ))}
          </div>
        </motion.section>

        <motion.section
          transition={TRANSITION_SECTION}
          variants={VARIANTS_SECTION}
        >
          <Link className="underlined mb-3 font-medium text-lg" href="/posts">
            Posts
          </Link>
          <div className="flex flex-col space-y-1">
            {latestPosts.map((post, idx) => (
              <AnimatedBackgroundItem id={post._id} key={idx}>
                <Link className="underlined font-bold text-lg" href={post.url}>
                  {post.title}
                </Link>
                {post.description ? <p>{post.description}</p> : null}
                <time
                  className="my-1 block text-gray-600 text-xs"
                  dateTime={post.date}
                >
                  {format(post.date, "LLLL d, yyyy")}
                </time>
              </AnimatedBackgroundItem>
            ))}
          </div>
        </motion.section>
      </AnimatedBackground>

      <motion.section
        transition={TRANSITION_SECTION}
        variants={VARIANTS_SECTION}
      >
        <Link className="underlined mb-3 font-medium text-lg" href="/contact">
          Contact
        </Link>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          Feel free to contact me at{" "}
          <a className="underlined dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3" />
      </motion.section>
    </motion.main>
  )
}
