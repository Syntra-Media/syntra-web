import {supabaseClient} from "@/utils/supabaseClient";

export const isUserAdmin = async ({userId, token}: any) => {
    const supabase = await supabaseClient(token);

    const {data} = await supabase.from("admins").select().eq("user_id", userId).single();

    if (data) {
        return true;
    }

    return false;
}

export const getPosts = async () => {
    const supabase = await supabaseClient();

    const {data, error} = await supabase.from("posts").select();

    if (error) {
        console.error(error);
        return [];
    }

    data?.forEach((post: any) => {
        post.reading_time = Math.ceil(post.content.split(" ").length / 200);
        post.date = new Date(post.created_at).toLocaleDateString("tr-TR");
    })

    return data;
}

export const createPost = async ({token, title, content, image, category, writer}: any) => {
    const supabase = await supabaseClient(token);

    const {data, error} = await supabase.from("posts").insert([{title, content, image, category, writer}]);

    if (error) {
        console.error(error);
        return false;
    }

    return data;
}

export const deletePost = async ({token, title}: any) => {
    const supabase = await supabaseClient(token);

    const {data, error} = await supabase.from("posts").delete().eq("title", title);

    if (error) {
        console.error(error);
        return false;
    }

    return data;
}

export const updatePost = async ({token, title, content, image}: any) => {
    const supabase = await supabaseClient(token);

    const {data, error} = await supabase.from("posts").update({content, image}).eq("title", title);

    if (error) {
        console.error(error);
        return false;
    }

    return data;
}

export const getPost = async ({title}: any) => {
    const supabase = await supabaseClient();

    console.log(title)

    const {data, error} = await supabase.from("posts").select().eq("title", title).single();

    if (error) {
        console.error(error);
        return false;
    }

    return data;
}