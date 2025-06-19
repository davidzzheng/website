'use client'

import type { Post } from 'contentlayer/generated'
import { format } from 'date-fns'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'

import ScrambleText from '@/components/ui/scramble-text'
import { TRANSITION_SECTION, VARIANTS_CONTAINER, VARIANTS_SECTION } from '@/lib/animation'

export const PostView = ({ post }: { post: Post }) => {
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <motion.article
      className="mx-auto max-w-xl space-y-16 py-8"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col space-y-2 text-center">
        <ScrambleText className="mb-1 text-gray-600 text-sm" text={format(post.date, 'LLLL d, yyyy')} />
        <ScrambleText as="h1" className="font-bold text-3xl" text={post.title} />
        {post.description ? <ScrambleText as="p" className="text-gray-600 text-sm" text={post.description} /> : null}
        {post.image ? (
          <motion.div
            variants={VARIANTS_SECTION}
            transition={{ ...TRANSITION_SECTION, delay: 0.5 }}
            className="flex justify-center"
          >
            <Image src={post.image} alt={post.title} className="rounded-lg" />
          </motion.div>
        ) : null}
      </div>
      <motion.section
        variants={VARIANTS_SECTION}
        transition={{ ...TRANSITION_SECTION, delay: 0.5 }}
        className="prose dark:prose-invert"
      >
        <MDXContent />
      </motion.section>
    </motion.article>
  )
}
