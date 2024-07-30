'use client'

import { BlurFade } from '@/components/blur-fade'
import { Layout } from '@/components/layout'
import Link from 'next/link'

export const HomeView = () => {
	return (
		<Layout>
			<Layout.Main className="rounded-lg bg-background/75 p-8">
				<section id="header" className="flex flex-col gap-y-6">
					<BlurFade delay={0.25} inView>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
							Hello{' '}
							<span className="w-fit animate-text-gradient bg-gradient-to-r from-blue-400 from-30% via-green-500 via-70% to-blue-400 bg-[length:200%] bg-clip-text text-6xl font-bold leading-none text-transparent transition-[background-position] direction-reverse">
								World
							</span>{' '}
							👋
						</h2>
					</BlurFade>
					<BlurFade delay={0.25 * 1} inView>
						<span className="text-pretty text-lg">
							My name is David Zheng. I&apos;m a developer based out of
							Vancouver, Canada.
						</span>
					</BlurFade>
					<BlurFade delay={0.25 * 2} inView>
						<span className="text-pretty text-lg">
							I have over 5 years of professional experience building scalable
							full-stack web applications. My primary stack is React with
							Next.js, TypeScript, TailwindCSS, and Fastify, but I am always
							looking to work with new{' '}
							<Link href="/work" className="text-link">
								technologies & paradigms.{' '}
							</Link>
						</span>
					</BlurFade>
					<BlurFade delay={0.25 * 3} inView>
						<span className="text-pretty text-lg">
							In my spare time, I enjoy diving deep into topics like
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
