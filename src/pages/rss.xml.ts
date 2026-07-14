import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts, postSlug } from "@/lib/posts";

export async function GET(context: APIContext) {
	const posts = await getPublishedPosts();
	return rss({
		title: "david zheng — writing",
		description: "notes on frontend, design, and the web",
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: `/posts/${postSlug(post)}/`,
		})),
	});
}
