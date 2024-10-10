import createClient from "./supabaseServer";

export const getPost = async (slug: string) => {
    const supabase = createClient();
    const {data, error} = await supabase.from("posts").select().eq("slug", slug);

    if (data && data.length > 0) {
        data[0].reading_time = Math.ceil(data[0].content.split(" ").length / 200);
        data[0].date = new Date(data[0].created_at).toLocaleDateString("tr-TR");

        return data[0];
    }

    return null;
}

export const getLatestPost = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("posts")
        .select()
        .order('created_at', { ascending: false })
        .limit(1);

    if (data && data.length > 0) {
        const post = data[0];
        post.reading_time = Math.ceil(post.content.split(" ").length / 200);
        post.date = new Date(post.created_at).toLocaleDateString("tr-TR");
        return post;
    }

    return null;
}