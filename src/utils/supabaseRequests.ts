import {supabaseClient} from "@/utils/supabaseClient";

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

export const createPost = async ({token, title, content, image, category, writer, slug}: any) => {
    const supabase = await supabaseClient(token);

    const {data, error} = await supabase.from("posts").insert([{title, content, image, category, writer, slug}]);

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

export const updatePost = async ({ token, id, title, slug, content, image, category }: any) => {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from("posts")
        .update({ title, slug, content, image, category })
        .eq("id", id);

    if (error) {
        console.error("Update error:", error.message, error.details);
        return false;
    }

    return data;
};

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

export const getMeetings = async ({token}: any) => {
    const supabase = await supabaseClient(token);

    const {data, error} = await supabase.from("meetings").select();

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export const approveMeeting = async ({token, id}: any) => {
    const supabase = await supabaseClient(token);

    const {data, error} = await supabase.from("meetings").update({status: "approved"}).eq("id", id);

    if (error) {
        console.error(error);
        return false;
    }

    console.log(data)

    return data;
}

export const declineMeeting = async ({token, id}: any) => {
    const supabase = await supabaseClient(token);

    const {data, error} = await supabase.from("meetings").update({status: "declined"}).eq("id", id);

    if (error) {
        console.error(error);
        return false;
    }

    return data;
}

export const cancelMeeting = async ({token, id}: any) => {
    const supabase = await supabaseClient(token);

    const {data, error} = await supabase.from("meetings").update({status: "waiting"}).eq("id", id);

    if (error) {
        console.error(error);
        return false;
    }

    return data;
}

export const deleteMeeting = async ({token, id}: any) => {
    const supabase = await supabaseClient(token);

    const {data, error} = await supabase.from("meetings").delete().eq("id", id);

    if (error) {
        console.error(error);
        return false;
    }

    return data;
}

