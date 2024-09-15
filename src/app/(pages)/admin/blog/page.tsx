"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import {useAuth} from "@clerk/nextjs";
import { createPost, deletePost, getPosts } from "@/utils/supabaseRequests";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Input } from '@/components/ui/Input';
import Tiptap from '@/components/ui/Tiptap';
import { Separator } from '@/components/ui/Separator';
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { CircleX, Pen, Eye } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdmin } from '@/components/providers/AdminProvider';
import {Oval} from 'react-loader-spinner'

type Category = "SEO/ASO" | "Sosyal Medya Pazarlaması" | "Web Tasarım" | "Aday Bulma" | "Ücretli Pazarlama" | "İçerik Pazarlaması" | "E-Posta Pazarlaması" | "Dijital Kaynak Kütüphanesi";

const schema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    content: z.string().min(3, "Content must be at least 3 characters"),
    writer: z.string().min(3, "Writer must be at least 3 characters"),
    image: z.string().url(),
    category: z.enum(["SEO/ASO", "Sosyal Medya Pazarlaması", "Web Tasarım", "Aday Bulma", "Ücretli Pazarlama", "İçerik Pazarlaması", "E-Posta Pazarlaması", "Dijital Kaynak Kütüphanesi"]),
});

const Page = () => {
    const {getToken} = useAuth();
    const {user, isLoaded} = useAdmin()
    const router = useRouter();
    const [posts, setPosts] = useState<any[]>();
    const [mode, setMode] = useState("write");
    const [content, setContent] = useState("");
    const [selectedPost, setSelectedPost] = useState<any>();
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
        setValue("content", newContent);
    };

    const handlePostEdit = (post: any) => {
        setSelectedPost(post);
        setContent(post.content.toString());
        reset({
            title: post.title,
            content: post.content,
            image: post.image,
            category: post.category,
            writer: post.writer
        });
        setMode("edit");
    };

    const handlePostDelete = async (title: string) => {
        const token = await getToken({ template: "supabase" });
        await deletePost({ token, title });

        const posts = await getPosts();
        setPosts(posts);
    };

    useEffect(() => {
        const GetPostsFromDB = async () => {
            const posts = await getPosts();
            setPosts(posts);
            setValue("writer", user?.fullName);
        };
        GetPostsFromDB();
    }, []);

    const onSubmit = async (data: any) => {
        const token = await getToken({ template: "supabase" });
        await createPost({ token, ...data });

        setContent("");
        reset();

        const posts = await getPosts();
        setPosts(posts);
    };

    if (!isLoaded) {
        return (
            <div className={"w-full h-screen flex items-center justify-center"}>
                <Oval color={"#ffc300"}/>
            </div>
        )
    }

    return (
        <div className={"w-full flex"}>
            <div className={"flex flex-col w-full h-full mx-32 my-12 gap-4"}>
                <Button className={"w-max"} size={"lg"} variant={"secondary"}>
                    <Link href={"/admin"}>
                        Back
                    </Link>
                </Button>

                <div className={"flex w-full h-full gap-12"}>
                    <div className={"p-4 flex w-full h-full flex-col border border-light/30 rounded-lg"}>
                        <div className={"w-full flex gap-4"}>
                            <Button onClick={() => setMode("write")} className={"w-full"} size={"lg"} variant={mode === "write" ? "default" : "secondary"}>
                                Write
                            </Button>
                            <Button onClick={() => setMode("edit")} className={"w-full"} size={"lg"} variant={mode === "edit" ? "default" : "secondary"}>
                                Edit
                            </Button>
                        </div>
                        <Separator className={"my-4 bg-light/30"} />
                        <form onSubmit={handleSubmit(onSubmit)} className={"w-full h-full flex flex-col gap-4"}>
                            <div>
                                <Input className={"w-full"} placeholder={"Title"} {...register("title")} required />
                                {errors.title && <p className="text-red-500">{errors.title.message?.toString()}</p>}
                            </div>
                            <div>
                                <Input className={"w-full"} placeholder={"Slug"} {...register("slug")} required />
                                {errors.slug && <p className="text-red-500">{errors.slug.message?.toString()}</p>}
                            </div>
                            <div>
                                <Tiptap
                                    className={"w-full h-full"}
                                    content={content}
                                    onChange={handleContentChange}
                                />
                                {errors.content && <p className="text-red-500">{errors.content.message?.toString()}</p>}
                            </div>
                            <div>
                                <select className={"w-full p-3 bg-neutral-800"} {...register("category")}>
                                    <option value="SEO/ASO">SEO/ASO</option>
                                    <option value="Sosyal Medya Pazarlaması">Sosyal Medya Pazarlaması</option>
                                    <option value="Web Tasarım">Web Tasarım</option>
                                    <option value="Aday Bulma">Aday Bulma</option>
                                    <option value="Ücretli Pazarlama">Ücretli Pazarlama</option>
                                    <option value="İçerik Pazarlaması">İçerik Pazarlaması</option>
                                    <option value="E-Posta Pazarlaması">E-Posta Pazarlaması</option>
                                    <option value="Dijital Kaynak Kütüphanesi">Dijital Kaynak Kütüphanesi</option>
                                </select>
                                {errors.category && <p className="text-red-500">{errors.category.message?.toString()}</p>}
                            </div>
                            <div>
                                <UploadDropzone
                                    endpoint="imageUploader"
                                    config={{mode: "auto"}}
                                    onClientUploadComplete={(res: any) => {
                                        if (res && res.length > 0) {
                                            setValue("image", res[0].url);
                                        } else {
                                            alert("Upload failed, no response received.");
                                        }
                                    }}
                                    onUploadError={(error: Error) => {
                                        alert(`ERROR! ${error.message}`);
                                    }}
                                />
                                {errors.image && <p className="text-red-500">{errors.image.message?.toString()}</p>}
                            </div>
                            <Button type="submit" className={"w-full"} size={"lg"} variant={"default"}>
                                {mode === "write" ? "Create Post" : "Update Post"}
                            </Button>
                        </form>
                    </div>
                    <div className={"p-4 flex w-full h-full flex-col border border-light/30 rounded-lg"}>
                        <h1 className={"font-medium text-3xl"}>
                            Posts
                        </h1>
                        <div className={"w-full h-full flex flex-col gap-4 mt-4"}>
                            {posts?.length === 0 && (
                                <p className={"text-light/50"}>
                                    No posts found.
                                </p>
                            )}

                            {posts?.map((post) => (
                                <div key={post.id} className={"w-full flex gap-2 items-center"}>
                                    <Image src={post.image} width={512} height={512} className={"w-36 object-cover aspect-video"} alt={post.title} />
                                    <div className={"flex flex-col gap-1"}>
                                        <h2 className={"font-medium"}>
                                            {post.title}
                                        </h2>
                                        <p className={"prose line-clamp-1 text-light/50"} dangerouslySetInnerHTML={{ __html: post.content }}>
                                        </p>
                                        <div className={"p-1 flex gap-2 w-max border border-white/30 rounded-lg"}>
                                            <CircleX className={"text-red-500 w-6 h-6 cursor-pointer"} onClick={() => handlePostDelete(post.title)} />
                                            <Pen className={"text-blue-500 w-6 h-6 cursor-pointer"} onClick={() => handlePostEdit(post)} />
                                            <Eye className={"text-orange-500 w-6 h-6 cursor-pointer"} onClick={() => router.push("/blog/" + post.slug)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;