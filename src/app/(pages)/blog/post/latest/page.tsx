import SinglePost from "@/components/ui/SinglePost";
import { getLatestPost } from "@/utils/supabaseServerActions";
import { notFound, redirect } from "next/navigation";

export const generateMetadata = async () => {
    const post: any = await getLatestPost();

    if (!post) {
        return {
            title: 'Latest Blog Post',
            description: 'No description available',
        }
    }

    return {
        title: post.title,
        description: post.content.slice(0, 150)
    }
}

const PostPage = async () => {
    const post: any = await getLatestPost();

    if (!post) {
        return notFound();
    }

    // Redirect to the specific post page using the slug
    redirect(`/blog/${post.slug}`);
}

export default PostPage;