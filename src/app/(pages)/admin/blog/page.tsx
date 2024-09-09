"use client";

import React, {useEffect, useState} from 'react';
import {useAuth, useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {createPost, deletePost, getPosts, isUserAdmin} from "@/utils/supabaseRequests";
import {Button} from "@/components/ui/Button";
import Link from "next/link";
import { Input } from '@/components/ui/Input';
import Tiptap from '@/components/ui/Tiptap';
import { Separator } from '@/components/ui/Separator';
import {UploadDropzone} from "@/utils/uploadthing";
import Image from "next/image";
import {CircleX, Pen, Eye} from "lucide-react";

type Category = "SEO/ASO" | "Sosyal Medya Pazarlaması" | "Web Tasarım" | "Aday Bulma" | "Ücretli Pazarlama" | "İçerik Pazarlaması" | "E-Posta Pazarlaması" | "Dijital Kaynak Kütüphanesi";

const Page = () => {
    const {getToken, userId} = useAuth();
    const {user} = useUser();
    const router = useRouter();
    const [posts, setPosts] = useState<any[]>();
    const [mode, setMode] = useState("write")
    const [content, setContent] = React.useState("");
    const [selectedPost, setSelectedPost] = useState<any>();
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [category, setCategory] = useState<Category>("SEO/ASO");

    const handleContentChange = (reason: any) => {
        setContent(reason);
    }

    // TODO: Implement edit post
    const handlePostEdit = (post: any) => {
        setSelectedPost(post);
        setContent(post.content.toString());
        if (inputRef.current) {
            inputRef.current.value = post.title;
        }

        setMode("edit");
    }

    const handlePostDelete = async (title: string) => {
        const token = await getToken({template: "supabase"});
        await deletePost({token, title: title});

        const posts = await getPosts();
        setPosts(posts);
    }

    useEffect(() => {
        const checkAdmin = async () => {
            const token = await getToken({template: "supabase"});
            const admin = await isUserAdmin({userId, token});

            if (!admin) {
                router.push("/");
            }

            const posts = await getPosts();
            setPosts(posts);
        }
        checkAdmin();
    }, [
        userId,
        getToken,
        router
    ]);

    return (
        <div className={"w-full flex"}>
            <div className={"flex flex-col w-full h-full mx-32 my-12 gap-4"}>
                <Button className={"w-max"} size={"lg"} variant={"secondary"}>
                    <Link href={"/admin"}>
                        Back
                    </Link>
                </Button>

                {/* TODO: Create category and writer fields */}
                <div className={"flex w-full h-full gap-12"}>
                    <div className={"p-4 flex w-full h-full flex-col border border-light/30 rounded-lg"}>
                        <div className={"w-full flex gap-4"}>
                            <Button  onClick={() => setMode("write")} className={"w-full"} size={"lg"} variant={mode === "write" ? "default" : "secondary"}>
                                Write
                            </Button>
                            <Button onClick={() => setMode("edit")} className={"w-full"} size={"lg"} variant={mode === "edit" ? "default" : "secondary"}>
                                Edit
                            </Button>
                        </div>
                        <Separator className={"my-4 bg-light/30"}/>
                        <div className={"w-full h-full flex flex-col gap-4"}>
                            <Input className={"w-full"} placeholder={"Title"} required={true} ref={inputRef}/>
                            <Tiptap
                                className={"w-full h-full"}
                                content={content}
                                onChange={(newContent: string) => handleContentChange(newContent)}
                            />
                            <select className={"w-full p-3 bg-neutral-800"} onChange={(e) => setCategory(e.target.value as Category)}>
                                <option value="SEO/ASO">SEO/ASO</option>
                                <option value="Sosyal Medya Pazarlaması">Sosyal Medya Pazarlaması</option>
                                <option value="Web Tasarım">Web Tasarım</option>
                                <option value="Aday Bulma">Aday Bulma</option>
                                <option value="Ücretli Pazarlama">Ücretli Pazarlama</option>
                                <option value="İçerik Pazarlaması">İçerik Pazarlaması</option>
                                <option value="E-Posta Pazarlaması">E-Posta Pazarlaması</option>
                                <option value="Dijital Kaynak Kütüphanesi">Dijital Kaynak Kütüphanesi</option>
                            </select>
                        </div>
                        <div>
                            <UploadDropzone
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    const uploadPost = async () => {
                                        const token = await getToken({template: "supabase"});
                                        await createPost({token, title: inputRef.current?.value as string, content, image: res[0].url as string, category, writer: user?.fullName as string});

                                        setContent("");
                                        inputRef.current!.value = "";

                                        const posts = await getPosts();
                                        setPosts(posts);
                                    }
                                    uploadPost();
                                }}
                                onUploadError={(error: Error) => {
                                    // Do something with the error.
                                    alert(`ERROR! ${error.message}`);
                                }}
                            />
                        </div>
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
                                    <Image src={post.image} width={512} height={512} className={"w-36 object-cover"} alt={post.title}/>
                                    <div className={"flex flex-col gap-1"}>
                                        <h2 className={"font-medium"}>
                                            {post.title}
                                        </h2>
                                        <p className={"prose line-clamp-1 text-light/50"} dangerouslySetInnerHTML={{__html: post.content}}>
                                        </p>
                                        <div className={"p-1 flex gap-2 w-max border border-white/30 rounded-lg"}>
                                            <CircleX className={"text-red-500 w-6 h-6 cursor-pointer"} onClick={() => handlePostDelete(post.title)}/>
                                            <Pen className={"text-blue-500 w-6 h-6 cursor-pointer"} onClick={() => handlePostEdit(post)} />
                                            <Eye className={"text-orange-500 w-6 h-6 cursor-pointer"} onClick={() => router.push("/blog/" + encodeURIComponent(post.title))} />
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