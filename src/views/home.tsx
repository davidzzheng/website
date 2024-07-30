'use client'

import { BlurFade } from '@/components/blur-fade'
import { Layout } from '@/components/layout'
import Link from 'next/link'

export const HomeView = () => {
	return (
		<Layout>
			<Layout.Main className="bg-background/75 p-8">
				<section id="header" className="flex flex-col gap-y-6">
					<BlurFade delay={0.25} inView>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
							Hello World 👋
						</h2>
					</BlurFade>
					<BlurFade delay={0.25 * 2} inView>
						<span className="text-pretty text-lg">
							My name is David Zheng. I'm a hobbyist programmer turned
							professional software engineer based out of Vancouver, Canada.
						</span>
					</BlurFade>
					<BlurFade delay={0.25 * 3} inView>
						<span className="text-pretty text-lg">
							I specialize in building scalable full-stack web applications. My
							primary stack is React with Next.js, TypeScript, TailwindCSS, and
							Fastify, but I am always looking to build with new{' '}
							<Link href="/work" className="text-link">
								technologies & paradigms.{' '}
							</Link>
						</span>
					</BlurFade>
					<BlurFade delay={0.25 * 4} inView>
						<span className="text-pretty text-lg">
							In my spare time, I enjoying diving deep into topics like
							cryptocurrencies & artificial intelligence, experimenting and
							write about them on my{' '}
							<Link href="/blog" className="text-link">
								blog
							</Link>
							.
						</span>
					</BlurFade>
				</section>
			</Layout.Main>
		</Layout>
	)
}
