import React from 'react';
import {NAV_ITEMS} from "@/utils/navItems";
import Link from "next/link";

const Footer = () => {
    return (
        <div className={"w-full h-full border-t border-light/20 flex overflow-hidden"}>
            <div className={"flex flex-col lg:flex-row mx-8 lg:mx-28 my-12 w-full h-full gap-x-96 gap-y-8"}>
                <div className={"flex w-full h-full flex-col gap-4"}>
                    <h2 className={"text-2xl font-medium"}>
                        Syntra Media
                    </h2>
                    <p className={"text-light/90"}>
                        We offer customized digital marketing solutions, including web design, SEO, social media management, and content creation, to enhance your online presence and drive business growth.
                    </p>
                </div>
                <div className={"flex w-full h-full flex-col lg:items-end"}>
                    <div className={"flex flex-col gap-4"}>
                        <h2 className={"text-2xl font-medium lg:text-right text-light/90"}>
                            Quick Links
                        </h2>
                        <div className={"flex flex-col lg:flex-row gap-4 text-light/70"}>
                            {
                                NAV_ITEMS.map((item, index) => (
                                    <Link key={index} href={item.href}>
                                        <p className={"text-light/90 hover:text-primary-100 text-lg uppercase"}>{item.title}</p>
                                    </Link>
                                ))
                            }
                        </div>
                        <p className={"mt-4 text-light/50 text-center lg:text-right"}>
                            &copy; 2024 Syntra Media. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;