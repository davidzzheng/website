"use client";

import { Layout } from "@/components/layout";
import { formatDate } from "@/lib/date";
import { Post } from "payload-types";

type BlogPostViewProps = {
	post: Post;
};

export const BlogPostView = ({ post }: BlogPostViewProps) => {
	return (
		<Layout>
			<Layout.Main className="rounded-lg bg-background/75 p-8">
				<h1 className="mb-3 font-bold tracking-tighter ~text-2xl/4xl">
					{post.title}
				</h1>
				<div className="flex items-center justify-between">
					<p className="~text-xs/sm">Posted on {formatDate(post.createdAt)}</p>
				</div>
				<div
					className="prose my-4 text-lg text-foreground dark:prose-invert"
					dangerouslySetInnerHTML={{
						__html: post.contentHtml!,
					}}
				/>
			</Layout.Main>
			{/* <Layout.Bottom className="rounded-lg bg-background/75 p-8"> */}
			{/* 	<h1 className="mb-3 font-bold tracking-tighter ~text-lg/xl"> */}
			{/* 		Other Posts */}
			{/* 	</h1> */}
			{/* </Layout.Bottom> */}
		</Layout>
	);
};
