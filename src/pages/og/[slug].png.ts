import type { APIRoute, GetStaticPaths } from "astro";
import { getPublishedPosts } from "@/lib/content";
import { generateOgImage } from "@/lib/og";

export const getStaticPaths = (async () => {
	const posts = await getPublishedPosts();
	return posts.map((post) => ({
		params: { slug: post.id },
		props: { title: post.data.title, description: post.data.description },
	}));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
	const png = await generateOgImage({
		title: props.title,
		subtitle: props.description,
	});
	return new Response(png, {
		headers: { "Content-Type": "image/png" },
	});
};
