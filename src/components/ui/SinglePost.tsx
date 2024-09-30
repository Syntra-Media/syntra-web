import React from 'react';
import { Separator } from '@/components/ui/Separator';

interface Post {
  category: string;
  title: string;
  writer: string;
  date: string;
  reading_time: number;
  content: string;
}

interface SinglePostProps {
  post: Post;
}

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
    return (
        <>
          <div className={"w-full h-full flex justify-center"}>
            <div className={"flex w-full mx-8 lg:mx-0 lg:max-w-[58rem] my-12"}>
                <div className={"w-full flex flex-col"}>
                    <p className={"uppercase text-primary mb-4"}>
                        {post.category}
                    </p>
                    <h1 className={"font-bold text-4xl w-full"}>
                        {post.title}
                    </h1>
                    <div className={"flex flex-col gap-3 mt-6"}>
                        <p className={"text-base font-medium"}>
                            {post.writer}
                        </p>
                        <div className={"flex items-center text-light/70"}>
                            <p>
                                {post.date}
                            </p>
                            <Separator orientation={"vertical"} className={"h-6 bg-light/60 mx-2"}/>
                            <p className={post.reading_time > 0 ? "block": "hidden"}>
                                {post.reading_time} dk. okuma süresi
                            </p>
                        </div>
                    </div>
                    <div className={"flex gap-12 mt-12 w-full"}>
                        <div className={"w-full prose prose-lg prose-invert"}>
                            <div dangerouslySetInnerHTML={{__html: post.content || ''}}></div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}

export default SinglePost;