'use client'

import { Layout } from '@/components/layout'
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react'

export const ContactView = () => {
	return (
		<Layout>
			<Layout.Main className="space-y-4 bg-background/75 p-6">
				<h1 className="font-bold tracking-tighter ~text-2xl/4xl">Contact</h1>
				<section className="flex items-center gap-x-6">
					<p className="text-base">External Links:</p>
					<a
						className="transition-transform hover:scale-125"
						href="https://www.linkedin.com/in/davidzzheng/"
						target="_blank"
					>
						<LinkedinIcon size={24} aria-label="LinkedIn" />
					</a>
					<a
						className="transition-transform hover:scale-125"
						href="https://github.com/davidzzheng"
						target="_blank"
					>
						<GithubIcon size={24} aria-label="Github" />
					</a>
					<a
						className="transition-transform hover:scale-125"
						href="mailto:hello@davidzheng.me"
					>
						<MailIcon size={24} aria-label="Email" />
					</a>
				</section>
			</Layout.Main>
		</Layout>
	)
}
