"use client";

import React from 'react'
import { Separator } from './Separator';
import {CircleX, Menu} from "lucide-react";
import { Button } from './Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import {cn} from "@/utils/cn";
import { usePosts } from '../providers/PostProvider';

export const NAV_ITEMS = [
    {
        name: "Anasayfa",
        route: "/blog",
    },
    {
        name: "En Yeni Yazılar",
        route: "/blog/latest",
    },
    {
        name: "SEO/ASO",
        route: "/blog/category/seo-aso",
    },
    {
        name: "Sosyal Medya Pazarlaması",
        route: "/blog/category/social-media",
    },
    {
        name: "Web Tasarım",
        route: "/blog/category/web-design",
    },
    {
        name: "Aday Bulma",
        route: "/blog/category/recruitment",
    },
    {
        name: "Ücretli Pazarlama",
        route: "/blog/category/paid-marketing",
    },
]

const BlogHeader = () => {
    const [open, setOpen] = React.useState(false);
    const pathname = usePathname();

    const {posts, loading} = usePosts();

    return (
        <div className={"w-full h-24 flex"}>
            <div className={"w-full flex items-center mx-12 justify-between gap-12"}>
                <div className={"flex items-center"}>
                    <Link href={"/"}>
                        <svg width="18" height="38" viewBox="0 0 18 38" fill="none"
                             xmlns="http://www.w3.org/2000/svg"
                             >
                            <path
                                d="M0 18.1485L6.13333 5.99242L11.6 3.08182L18 0L9.32727 18.1485H18L11.4667 32.5303L6.13333 34.9273L0 37.6667L9.32727 18.1485H0Z"
                                stroke={"#FFC300"}
                            />
                        </svg>
                    </Link>
                    <Separator orientation={"vertical"} className={"bg-light/20 mx-4 h-12"}/>
                    <Link className={"font-medium uppercase text-light/70"} href={"/blog"} passHref>
                        Blog
                    </Link>
                </div>
                <div className={"flex items-center justify-center lg:hidden"}>
                    <Button onClick={() => setOpen(!open)} variant={"ghost"}>
                        <Menu className={"text-primary-100"}/>
                    </Button>
                    {
                        open && (
                            <div className={"absolute top-0 left-0 flex flex-col justify-center text-center gap-4 w-full h-screen bg-neutral-800/50 backdrop-blur"}>
                                {NAV_ITEMS.map((item) => (
                                    <Link key={item.route}
                                        href={item.route}
                                          passHref
                                        className={cn("transition-all text-lg text-light/70 hover:text-light/100", pathname === item.route && "text-light")}>
                                        {item.name}
                                    </Link>
                                ))}
                                <CircleX onClick={() => setOpen(false)} className={"absolute top-0 right-0 m-12 cursor-pointer"} size={36}/>
                            </div>
                        )
                    }
                </div>
                <div className={"gap-4 items-center justify-end hidden lg:flex overflow-hidden"}>
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.route}
                            href={item.route}
                              passHref
                            className={cn("transition-all text-light/70 hover:text-light/100", pathname === item.route && "text-light")}>
                             {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BlogHeader;