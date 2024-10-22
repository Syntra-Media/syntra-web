"use client";

import React, { useEffect, use } from 'react';
import {NAV_ITEMS} from '@/components/ui/BlogHeader'
import {usePosts} from "@/components/providers/PostProvider";
import {Oval} from "react-loader-spinner";
import Link from "next/link";
import Image from "next/image";

const Category = (props: {params: Promise<{slug: string}>}) => {
    const params = use(props.params);
    const [categorizedPosts, setCategorizedPosts] = React.useState<any[]>();
    const [category, setCategory] = React.useState<string>(NAV_ITEMS.find(item => item.route === `/blog/category/${params.slug}`)?.name || "");
    const {posts, loading} = usePosts();

    useEffect(() => {
        if (loading) {
            return;
        }

        const categoryPosts = posts.filter(post => post.category === category);
        console.log(categoryPosts);
        setCategorizedPosts(categoryPosts);
    }, [loading]);

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
                            {category}
                        </h2>
                    </div>
                    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
                        {
                            (categorizedPosts?.length == 0) && (
                                <div>
                                    <p className={"text-light/60"}>
                                        Bu kategoride henüz hiç yazı bulunmamaktadır.
                                    </p>
                                </div>
                            )
                        }
                        {
                            categorizedPosts?.map((post: any, index: number) => {
                                if (post.category === category || category === "Tüm Yazılar") {
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
}

export default Category;