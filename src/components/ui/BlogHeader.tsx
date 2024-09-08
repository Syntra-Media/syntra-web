"use client";

import React from 'react'
import { Separator } from './Separator';
import {CircleX, Menu} from "lucide-react";
import { Button } from './Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import {cn} from "@/utils/cn";

const NAV_ITEMS = [
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
    {
        name: "İçerik Pazarlaması",
        route: "/blog/category/content-marketing",
    },
    {
        name: "E-Posta Pazarlaması",
        route: "/blog/category/email-marketing",
    },
    {
        name: "Dijital Kaynak Kütüphanesi",
        route: "/blog/category/digital-library",
    },
]

const BlogHeader = () => {
    const [open, setOpen] = React.useState(false);
    const pathname = usePathname();

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
                    <p className={"font-medium uppercase text-light/70"}>
                        Blog
                    </p>
                </div>
                <div className={"flex items-center justify-center lg:hidden"}>
                    <Button onClick={() => setOpen(!open)} variant={"ghost"}>
                        <Menu/>
                    </Button>
                    {
                        open && (
                            <div className={"absolute top-0 left-0 flex flex-col justify-center text-center gap-4 w-full h-screen bg-neutral-800/50 backdrop-blur"}>
                                {NAV_ITEMS.map((item) => (
                                    <a key={item.route}
                                        href={item.route}
                                        className={cn("transition-all text-lg text-light/70 hover:text-light/100", pathname === item.route && "text-light")}>
                                        {item.name}
                                    </a>
                                ))}
                                <CircleX onClick={() => setOpen(false)} className={"absolute top-0 right-0 m-12 cursor-pointer"} size={36}/>
                            </div>
                        )
                    }
                </div>
                <div className={"gap-4 items-center justify-end hidden lg:flex flex-wrap"}>
                    {NAV_ITEMS.map((item) => (
                        <a key={item.route}
                            href={item.route}
                            className={cn("transition-all text-light/70 hover:text-light/100", pathname === item.route && "text-light")}>
                             {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BlogHeader;