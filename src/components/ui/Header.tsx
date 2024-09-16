"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MenuIcon, MoveUpRight } from "lucide-react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { NAV_ITEMS, NavItem } from "@/utils/navItems";

import tr from "@/localization/tr.json";
import en from "@/localization/en.json";

type HeaderProps = {
    className?: string;
    locale?: keyof typeof NAV_ITEMS;
};

const Header = ({ className, locale = "tr" }: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLocale, setSelectedLocale] = useState(locale === "en" ? en : tr);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest(".menu") || (e.target as HTMLElement).closest("button")) return;
            setIsOpen(false);
        };

        window.addEventListener("mousedown", handler);
        return () => window.removeEventListener("mousedown", handler);
    }, []);

    const navItems = NAV_ITEMS[locale];

    return (
        <div className={cn("absolute flex w-full h-20 overflow-hidden", className)}>
            <div className={"flex w-full h-full my-2 justify-between items-center mx-8"}>
                <motion.div onClick={() => setIsOpen(!isOpen)}
                            className={"items-center cursor-pointer flex lg:hidden"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                >
                    <MenuIcon className={cn("transition-all hover:text-primary-100", isOpen && "rotate-90")} />
                </motion.div>
                <AnimatePresence>
                    {
                        isOpen && (
                            <motion.div
                                className={"menu fixed w-80 h-screen bg-bg/50 backdrop-blur z-50 top-0 left-0 flex flex-col gap-8"}
                                initial={{ x: "-20rem", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "-20rem", opacity: 0 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                <div className={"w-full flex justify-center my-8"}>
                                    <svg width="18" height="38" viewBox="0 0 18 38" fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
                                         className={"absolute right-1/2 translate-x-1/2"}>
                                        <motion.path
                                            d="M0 18.1485L6.13333 5.99242L11.6 3.08182L18 0L9.32727 18.1485H18L11.4667 32.5303L6.13333 34.9273L0 37.6667L9.32727 18.1485H0Z"
                                            stroke={"#FFC300"}
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                        />
                                    </svg>
                                </div>
                                <div className={"w-full flex flex-col gap-6"}>
                                    {
                                        navItems.map((item: NavItem, index: number) => (
                                            <div key={index} className={"mx-6 flex justify-between transition-all border-b border-light hover:border-primary-100 group"}>
                                                <Link href={item.href} className={"text-xl"}>
                                                    {item.title}
                                                </Link>
                                                <MoveUpRight className={"group-hover:text-primary-100"} />
                                            </div>
                                        ))
                                    }

                                    <Button variant={"default"} size={"lg"} className={"absolute bottom-0 right-1/2 translate-x-1/2 mb-8"} onClick={() => setIsOpen(!isOpen)}>
                                        Close
                                    </Button>
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>

                <svg width="18" height="38" viewBox="0 0 18 38" fill="none" xmlns="http://www.w3.org/2000/svg"
                     className={"lg:relative lg:translate-x-0 lg:right-0 absolute right-0 mr-8"}>
                    <motion.path
                        d="M0 18.1485L6.13333 5.99242L11.6 3.08182L18 0L9.32727 18.1485H18L11.4667 32.5303L6.13333 34.9273L0 37.6667L9.32727 18.1485H0Z"
                        stroke={"#FFC300"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </svg>

                <motion.div
                    className={"hidden lg:flex gap-8 items-center absolute right-1/2 translate-x-1/2 py-4 px-5 border border-light/10 rounded-xl shadow-xl"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    {
                        navItems.map((item: NavItem, index: number) => (
                            <Link key={index} href={item.href} className={"font-light text-light/70 hover:text-primary-100 hover:drop-shadow-2xl transition-all"}>
                                {item.title}
                            </Link>
                        ))
                    }
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className={"hidden lg:flex"}
                >
                    <Button variant={"secondary"}>
                        {selectedLocale.header.contact}
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};

export default Header;