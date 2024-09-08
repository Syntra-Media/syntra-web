"use client"

import React from 'react';
import {getPost} from "@/utils/supabaseRequests";
import {useRouter} from 'next/navigation'
import Image from "next/image";
import { Separator } from '@/components/ui/Separator';

const Page = ({params}: {params: {slug: string}}) => {
    const [post, setPost] = React.useState<any>();
    const [readingTime, setReadingTime] = React.useState<number>(0);
    const [date, setDate] = React.useState<string>("");
    const router = useRouter();

    React.useEffect(() => {
        const fetchPost = async () => {
            const data = await getPost({title: decodeURIComponent(params.slug)});
            console.log(decodeURIComponent(params.slug))
            console.log(data);

            if (!data) {
                router.push("/404")
                return;
            }

            setPost(data);
            setReadingTime(Math.ceil(data.content.split(" ").length / 200));
            setDate(new Date(data.created_at).toLocaleDateString("tr-TR"));
        }
        fetchPost();
    }, []);

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
                                {date}
                            </p>
                            <Separator orientation={"vertical"} className={"h-6 bg-light/60 mx-2"}/>
                            <p>
                                {readingTime} dk. okuma süresi
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