'use client'

import { Layout } from '@/components/layout'
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export const ContactView = () => {
	return (
		<Layout>
			<Layout.Main className="bg-background/75 p-8">
				<div className="mt-4 flex items-center gap-x-6">
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
				</div>
			</Layout.Main>
		</Layout>
	)
}
