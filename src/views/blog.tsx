import Link from 'next/link'
import { Post } from 'payload-types'

import { Layout } from '@/components/layout'
import { formatRelativeDate } from '@/lib/date'

type BlogViewProps = {
	posts: Post[];
};

export const BlogView = ({ posts }: BlogViewProps) => {
	return (
		<Layout>
			<Layout.Main className="rounded-lg bg-background/75">
				<h1 className="my-3 px-6 font-bold tracking-tighter ~text-2xl/4xl">
					Blog
				</h1>
				<section className="flex flex-col gap-y-6">
					{posts.map((post) => (
						<div
							key={post.id}
							className="m-2 flex flex-col gap-y-2 rounded p-4 transition hover:bg-muted/50"
						>
							<div className="flex items-center justify-between">
								<Link
									href={`/blog/${post.id}`}
									className="decorate-underline font-semibold ~text-lg/2xl"
								>
									{post.title}
								</Link>
								<p className="~text-xs/sm">
									{formatRelativeDate(post.createdAt)}
								</p>
							</div>
							<ul className="flex justify-end gap-2">
								{post.tags?.map((tag) => (
									<li
										key={tag.name}
										className="rounded bg-muted-foreground px-1"
									>
										{tag.name}
									</li>
								))}
							</ul>
						</div>
					))}
				</section>
			</Layout.Main>
		</Layout>
	)
}
