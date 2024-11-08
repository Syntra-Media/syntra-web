import createClient from "./supabaseServer";

export const getPost = async (slug: string) => {
    const supabase = await createClient();
    const {data, error} = await supabase.from("posts").select().eq("slug", slug);

    if (data && data.length > 0) {
        data[0].reading_time = Math.ceil(data[0].content.split(" ").length / 200);
        data[0].date = new Date(data[0].created_at).toLocaleDateString("tr-TR");

        return data[0];
    }

    return null;
}

export const getLatestPost = async () => {
    const supabase = await createClient();
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

export const getNotification = async (id: string) => {
    const supabase = await createClient();
    const {data, error} = await supabase.from("notifications").select().eq("id", id);
    if (data && data.length > 0) {
        const notification = data[0];
        
        const {data: files} = await supabase.from("files").select().in("id", notification.attachments);

        notification.attachments = files;

        return notification;
    }
    return null;
}

export const getProject = async (id: string) => {
  const supabase = await createClient();
  const {data, error} = await supabase.from("projects").select().eq("id", id);

  if (error) {
      console.error(error);
      return false;
  }

  let project = {...data[0]};

  const [
    { data: phases },
    { data: tasks },
    { data: payments },
    { data: files },
    { data: notifications }
  ] = await Promise.all([
    supabase.from("phases").select().eq("project", project.id),
    supabase.from("tasks").select().eq("project", project.id), 
    supabase.from("payments").select().eq("project", project.id),
    supabase.from("files").select().eq("project", project.id),
    supabase.from("notifications").select().eq("project", project.id)
  ]);

  project.phases = phases;
  project.tasks = tasks;
  project.payments = payments;
  project.files = files;
  project.notifications = notifications;

  return project;
}