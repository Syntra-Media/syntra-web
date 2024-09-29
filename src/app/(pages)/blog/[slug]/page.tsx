"use client"

import React, {useEffect} from 'react';
import {usePosts} from "@/components/providers/PostProvider";
import {useRouter} from 'next/navigation'
import { Separator } from '@/components/ui/Separator';

const Page = ({params}: {params: {slug: string}}) => {
    const [post, setPost] = React.useState<any>();
    const router = useRouter();

    const {posts, loading} = usePosts();

    useEffect(() => {
        if (loading) {
            return;
        }

        console.log(params.slug);
        const post = posts.find(post => post.slug === params.slug);
        if (!post) {
            return;
        }

        setPost(post);
        window.document.title = post?.title;
    }, [loading]);

    return (
        <div className={"w-full h-full flex justify-center"}>
            <div className={"flex w-full mx-8 lg:mx-0 lg:max-w-[58rem] my-12"}>
                <div className={"w-full flex flex-col"}>
                    <p className={"uppercase text-primary mb-4"}>
                        {post?.category}
                    </p>
                    <h1 className={"font-bold text-4xl w-full"}>
                        {post?.title}
                    </h1>
                    <div className={"flex flex-col gap-3 mt-6"}>
                        <p className={"text-base font-medium"}>
                            {post?.writer}
                        </p>
                        <div className={"flex items-center text-light/70"}>
                            <p>
                                {post?.date}
                            </p>
                            <Separator orientation={"vertical"} className={"h-6 bg-light/60 mx-2"}/>
                            <p className={post?.reading_time > 0 ? "block": "hidden"}>
                                {post?.reading_time} dk. okuma süresi
                            </p>
                        </div>
                    </div>
                    <div className={"flex gap-12 mt-12 w-full"}>
                        <p className={"w-full prose prose-lg prose-invert"} dangerouslySetInnerHTML={{__html: post?.content}}></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;