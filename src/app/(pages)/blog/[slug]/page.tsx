import SinglePost from "@/components/ui/SinglePost";
import { getPost } from "@/utils/supabaseServerActions";
import { notFound } from "next/navigation";
interface PostPageProps {
    params: Promise<{
        slug: string;
    }>
}

export const generateMetadata = async (props: PostPageProps) => {
    const params = await props.params;
    const post: any = await getPost(params.slug);

    if (!post) {
        return {
            title: 'Blog Post',
            description: 'No description available',
        }
    }

    return {
      title: post.title,
      description: post.content.slice(0, 150)
  }
}

const PostPage = async (props: PostPageProps) => {
    const params = await props.params;
    const post: any = await getPost(params.slug);

    if (!post) {
        return notFound();
    }


    return (
        <SinglePost post={post} />
    )
}

export default PostPage;