import { getPayload } from '@/lib/payload'
import { BlogPostView } from '@/views/blog-post'

type BlogPostPageProps = {
	params: {
		postId: string;
	};
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { postId } = params
	const payload = await getPayload()

	const post = await payload.findByID({ collection: 'posts', id: postId })

	if (!post) return null

	return <BlogPostView post={post} />
}
