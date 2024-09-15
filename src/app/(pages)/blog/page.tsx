"use client";

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import {Oval} from "react-loader-spinner";
import { cn } from '@/utils/cn';
import { Separator } from '@/components/ui/Separator';
import {usePosts} from "@/components/providers/PostProvider";

const Blog = () => {
    const {posts, loading} = usePosts();
    const latestPost = posts?.[posts?.length - 1];

    const [selected, setSelected] = React.useState<"latest" | "popular">("latest")
    const [selectedCategory, setSelectedCategory] = React.useState<string>("all")


    if (loading) {
        return (
            <div className={"w-full h-screen flex items-center justify-center"}>
                <Oval color={"#ffc300"}/>
            </div>
        )
    }

    return (
        <div className={"w-full flex"}>
            <div className={"flex flex-col w-full h-full mx-8 lg:mx-[5.5rem] 2xl:mx-[18rem] my-14"}>
                <div className={"flex w-full gap-12 justify-center"}>
                    <div className={"flex flex-col bg-neutral-800/50"}>
                        <Link href={`/blog/${latestPost?.slug}`} passHref className={"w-full"}>
                            <Image src={latestPost?.image} alt={latestPost?.title} width={640} height={480} className={"w-full object-cover aspect-video"}/>
                            <div className={"mt-8 mx-8 flex flex-col gap-2"}>
                                <p className={"text-primary font-medium"}>
                                    {latestPost?.category}
                                </p>
                                <h2 className={"font-medium text-2xl"}>
                                    {latestPost?.title}
                                </h2>
                                <p className={"prose mt-2 line-clamp-2 prose-invert text-light/50"} dangerouslySetInnerHTML={{__html: latestPost?.content}}></p>
                                <div className={"flex items-center my-4 text-light/70"}>
                                    <p>
                                        {latestPost?.date}
                                    </p>
                                    <Separator orientation={"vertical"} className={"h-6 bg-light/60 mx-2"}/>
                                    <p>
                                        {latestPost?.reading_time} dk. okuma süresi
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={"hidden lg:flex flex-col"}>
                        <div className={"flex justify-center w-full"}>
                            <div className={cn("cursor-pointer flex items-center justify-center w-full py-5 bg-neutral-800/50", selected === "latest" && "bg-transparent border-b border-primary")} onClick={() => setSelected("latest")}>
                                En Yeniler
                            </div>
                            <div
                                className={cn("cursor-pointer flex items-center justify-center w-full py-5 bg-neutral-800/50", selected === "popular" && "bg-transparent border-b border-primary")} onClick={() => setSelected("popular")}>
                                En Popülerler
                            </div>
                        </div>
                        <div className={"flex flex-col w-full gap-2 mt-4"}>
                            {
                                posts.map((post: any, index: number) => {
                                    if (index === posts.length - 1) return;
                                    if (index > 3) return;
                                    return (
                                        <Link href={`/blog/${post.slug}`} passHref key={post.id} className={"w-full"}>
                                            <div className={"flex gap-4 cursor-pointer"}>
                                                <div className={"flex flex-col gap-2"}>
                                                    <p className={"text-primary font-medium"}>
                                                        {post.category}
                                                    </p>
                                                    <h3 className={"font-medium"}>
                                                        {post.title}
                                                    </h3>
                                                    <div className={"flex items-center text-sm text-light/70"}>
                                                        <p>
                                                            {post.date}
                                                        </p>
                                                        <Separator orientation={"vertical"} className={"h-6 bg-light/60 mx-2"}/>
                                                        <p>
                                                            {post.reading_time} dk. okuma süresi
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator className={"w-full bg-light/30 my-4"}/>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={"grid w-full mt-12 grid-rows-4 grid-cols-1 md:grid-rows-2 md:grid-cols-2 lg:grid-rows-1 lg:grid-cols-4 gap-6"}>
                    {
                        posts.map((post: any, index: number) => {
                            if (index === posts.length - 1) return;
                            return (
                                <Link href={`/blog/${post.slug}`} passHref key={post.id} className={"w-full h-full"}>
                                    <div className={"flex flex-col gap-4 cursor-pointer w-full h-full"}>
                                        <Image src={post.image} alt={post.title} width={640} height={480} className={"w-full object-cover aspect-video"}/>
                                        <div className={"flex flex-col gap-1 w-full h-full"}>
                                            <p className={"text-primary font-medium text-sm"}>
                                                {post.category}
                                            </p>
                                            <h3 className={"font-medium"}>
                                                {post.title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className={"flex flex-col mt-12 w-full gap-8"}>
                    <div className={"flex flex-col gap-4"}>
                        <h2 className={"text-3xl font-medium"}>
                            En Yeniler
                        </h2>
                        <div className={"flex gap-10 text-light/70"}>
                            <p className={selectedCategory === "all" ? "text-light/90 border-b border-primary cursor-pointer" : "cursor-pointer"} onClick={() => setSelectedCategory("all")}>
                                Hepsi
                            </p>
                            <p className={selectedCategory === "SEO/ASO" ? "text-light/90 border-b border-primary cursor-pointer" : "cursor-pointer"} onClick={() => setSelectedCategory("SEO/ASO")}>
                                SEO
                            </p>
                            <p className={selectedCategory === "Web Tasarım" ? "text-light/90 border-b border-primary cursor-pointer" : "cursor-pointer"} onClick={() => setSelectedCategory("Web Tasarım")}>
                                Web Tasarım
                            </p>
                        </div>
                    </div>
                    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
                        {
                            posts.map((post: any, index: number) => {
                                if (index === posts.length - 1) return;
                                if (selectedCategory === "all" || post.category === selectedCategory) {
                                    return (
                                        <Link href={`/blog/${post.slug}`} passHref key={post.id} className={"w-full"}>
                                            <div className={"flex flex-col gap-4 cursor-pointer w-full"}>
                                                <Image src={post.image} alt={post.title} width={640} height={480} className={"w-full object-cover aspect-video"}/>
                                                <div className={"flex flex-col gap-1 w-full"}>
                                                    <p className={"text-primary font-medium text-sm"}>
                                                        {post.category}
                                                    </p>
                                                    <h3 className={"font-medium text-lg"}>
                                                        {post.title}
                                                    </h3>
                                                    <p className={"text-light/50 line-clamp-2 prose text-sm mt-0.5"} dangerouslySetInnerHTML={{__html: post.content}}></p>
                                                    <div className={"flex justify-between w-full mt-2 text-light/60 text-xs"}>
                                                        <p>
                                                            {post.reading_time} dk. okuma süresi
                                                        </p>
                                                        <p>
                                                            {post.date}
                                                        </p>

                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;