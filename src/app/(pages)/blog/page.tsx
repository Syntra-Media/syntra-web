"use client";

import React from 'react';
import {getPosts} from "@/utils/supabaseRequests";
import Image from "next/image";
import Link from 'next/link';
import {Skeleton} from "@/components/ui/Skeleton";
import {Oval} from "react-loader-spinner";
import { cn } from '@/utils/cn';
import { Separator } from '@/components/ui/Separator';

const Blog = () => {
    const [posts, setPosts] = React.useState<any>()
    const [latestPost, setLatestPost] = React.useState<any>()
    const [selected, setSelected] = React.useState<"latest" | "popular">("latest")

    React.useEffect(() => {
        const fetchPosts = async () => {
            // fetch posts
            const posts = await getPosts();

            if (!posts) {
                return;
            }

            setPosts(posts);
            setLatestPost(posts[posts.length - 1]);
        }
        fetchPosts();
    }, [])

    if (!posts) {
        return (
            <div className={"w-full h-full flex"}>
                <div className={"w-full h-full flex flex-col items-center my-8"}>
                    <div className={"flex flex-col gap-12 mx-8 lg:flex-row lg:mx-[64rem]"}>
                        <div className={"flex flex-col w-[32rem] h-[30rem] justify-center items-center bg-neutral-800/50 cursor-pointer"}>
                            <Oval color={"#ffc300"}/>
                            <div className={"flex flex-col gap-2 p-8"}>
                            </div>
                        </div>
                        <div className={"bg-neutral-500 w-[20rem]"}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={"w-full h-full flex"}>
            <div className={"w-full h-full flex flex-col items-center my-8"}>
                <div className={"flex flex-col gap-12 mx-8 lg:flex-row lg:mx-[64rem]"}>
                    <div className={"flex flex-col w-[32rem] bg-neutral-800/50 cursor-pointer"}>
                        <Link href={"/blog/"+ encodeURIComponent(latestPost?.title)}>
                            <Image src={latestPost?.image} alt={latestPost?.title} width={640} height={360} draggable={false} className={"w-[32rem]"}/>
                            <div className={"flex flex-col gap-2 p-8"}>
                                <p className={"uppercase text-primary"}>
                                    {latestPost?.category}
                                </p>
                                <h1 className={"font-medium text-2xl"}>
                                    {latestPost?.title}
                                </h1>
                                <p className={"text-light/70 line-clamp-2 prose mb-3"} dangerouslySetInnerHTML={{__html: latestPost?.content}}>
                                </p>
                                <div className={"flex items-center text-light/80"}>
                                    <p>
                                        {latestPost?.date}
                                    </p>
                                    <p className={"mx-2"}>
                                        •
                                    </p>
                                    <p>
                                        {latestPost?.reading_time} dk. okuma süresi
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={"flex flex-col gap-2 w-full lg:w-[22rem] h-full overflow-y-auto"}>
                        <div className={"flex w-full"}>
                            <div id={"latest"} className={cn("flex w-full py-4 bg-neutral-800 justify-center items-center", selected === "latest" && "bg-transparent border-b border-primary")} onClick={() => setSelected("latest")}>
                                En Yeniler
                            </div>
                            <div className={cn("flex w-full py-4 bg-neutral-800 justify-center items-center", selected === "popular" && "bg-transparent border-b border-primary")} onClick={() => setSelected("popular")}>
                                En Popülerler
                            </div>
                        </div>
                        <div className={"flex flex-col gap-3 mt-8 overflow-y-auto max-h-96"}>
                            {
                                // TODO: implement popularity
                                posts?.toReversed().map((post: any) => (
                                    <Link key={post.id} className={"flex flex-col gap-2"} href={"/blog/" + encodeURIComponent(post.title)}>
                                        <p className={"uppercase text-primary"}>
                                            {post.category}
                                        </p>
                                        <h2 className={"font-medium text-xl"}>
                                            {post.title}
                                        </h2>
                                        <div className={"flex items-center gap-2 text-light/70 text-light"}>
                                            <p>
                                                {post.date}
                                            </p>
                                            <p>
                                                •
                                            </p>
                                            <p>
                                                {post.reading_time} dk. okuma süresi
                                            </p>
                                        </div>
                                        <Separator className={"w-full bg-light/30 my-2"}/>
                                    </Link>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;