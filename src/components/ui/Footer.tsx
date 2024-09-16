"use client";

import React from 'react';
import { NAV_ITEMS, NavItem } from "@/utils/navItems";
import Link from "next/link";

type FooterProps = {
    locale?: keyof typeof NAV_ITEMS;
};

const Footer = ({ locale = "tr" }: FooterProps) => {
    const navItems = NAV_ITEMS[locale || "tr"] || [];

    return (
        <div className={"w-full h-full border-t border-light/20 flex overflow-hidden"}>
            <div className={"flex flex-col lg:flex-row mx-8 lg:mx-28 my-12 w-full h-full gap-x-96 gap-y-8"}>
                <div className={"flex w-full h-full flex-col gap-4"}>
                    <h2 className={"text-2xl font-medium"}>
                        Syntra Media
                    </h2>
                    <p className={"text-light/90"}>
                        {
                            locale === "en" ? "Syntra Media is a digital agency that specializes in web development, design, and digital marketing." : "Syntra Media, web geliştirme, tasarım ve dijital pazarlama konularında uzmanlaşmış bir dijital ajans."
                        }
                    </p>
                </div>
                <div className={"flex w-full h-full flex-col lg:items-end"}>
                    <div className={"flex flex-col gap-4"}>
                        <h2 className={"text-2xl font-medium lg:text-right text-light/90"}>
                            {
                                locale === "en" ? "Quick Links" : "Hızlı Bağlantılar"
                            }
                        </h2>
                        <div className={"flex flex-col lg:flex-row gap-4 text-light/70"}>
                            {
                                navItems.map((item: NavItem, index: number) => (
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