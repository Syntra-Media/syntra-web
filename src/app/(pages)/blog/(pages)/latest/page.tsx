"use client";

import React from 'react';
import {getPosts} from "@/utils/supabaseRequests";
import Image from "next/image";
import Link from 'next/link';
import {Skeleton} from "@/components/ui/Skeleton";
import {Oval} from "react-loader-spinner";
import { cn } from '@/utils/cn';
import { Separator } from '@/components/ui/Separator';
import { usePosts } from '@/components/providers/PostProvider';

const Blog = () => {
    const {posts, loading} = usePosts();
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
            <div className={"flex flex-col w-full h-full mx-8 lg:mx-[14rem] 2xl:mx-[18rem] my-14"}>
                <div className={"flex flex-col w-full gap-8"}>
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