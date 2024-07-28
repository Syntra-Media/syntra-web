"use client";

import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {MenuIcon, MoveUpRight, X} from "lucide-react";
import {cn} from "@/utils/cn";
import Link from "next/link";
import { NAV_ITEMS } from "@/utils/navItems";

type HeaderProps = {
    className?: string
}

const Header = ({className}: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let handler = (e) => {
            if (e.target.closest(".menu") || e.target.closest("button")) return;
            setIsOpen(false);
        }

        window.addEventListener("mousedown", handler);
    }, []);

    return (
        <div className={cn("absolute flex w-full h-20 overflow-hidden", className)}>
            <div className={"flex w-full h-full my-2 justify-between items-center mx-8"}>
                <motion.div onClick={() => setIsOpen(!isOpen)}
                            className={"items-center cursor-pointer hidden md:flex"}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1.5}}
                >
                    <MenuIcon className={cn("transition-all hover:text-primary-100", isOpen && "rotate-90")}/>
                </motion.div>
                <AnimatePresence>
                    {
                        isOpen && (
                            <motion.div
                                className={"menu fixed w-80 h-screen bg-bg/50 backdrop-blur z-50 top-0 left-0 flex flex-col gap-8"}
                                initial={{x: "-20rem", opacity:0}}
                                animate={{x:0, opacity: 1}}
                                exit={{x:"-20rem", opacity: 0}}
                                transition={{duration: 1, ease: "easeInOut"}}
                            >

                                <div className={"w-full flex justify-center my-8"}>
                                    <svg width="18" height="38" viewBox="0 0 18 38" fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
                                         className={"absolute right-1/2 translate-x-1/2"}>
                                        <motion.path
                                            d="M0 18.1485L6.13333 5.99242L11.6 3.08182L18 0L9.32727 18.1485H18L11.4667 32.5303L6.13333 34.9273L0 37.6667L9.32727 18.1485H0Z"
                                            stroke={"#FFC300"}
                                            initial={{pathLength: 0}}
                                            animate={{pathLength: 1}}
                                            transition={{duration: 1.5, ease: "easeInOut"}}
                                        />
                                    </svg>
                                </div>
                                <div className={"w-full flex flex-col gap-6"}>
                                    {
                                        NAV_ITEMS.map((item, index) => (
                                            <div key={index} className={"mx-6 flex justify-between transition-all border-b border-light hover:border-primary-100 group"}>
                                                <Link href={item.href} className={"text-xl"}>
                                                    {item.title}
                                                </Link>
                                                <MoveUpRight className={"group-hover:text-primary-100"}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>

                <svg width="18" height="38" viewBox="0 0 18 38" fill="none" xmlns="http://www.w3.org/2000/svg"
                     className={"md:absolute md:right-1/2 md:translate-x-1/2"}>
                    <motion.path
                        d="M0 18.1485L6.13333 5.99242L11.6 3.08182L18 0L9.32727 18.1485H18L11.4667 32.5303L6.13333 34.9273L0 37.6667L9.32727 18.1485H0Z"
                        stroke={"#FFC300"}
                        initial={{pathLength: 0}}
                        animate={{pathLength: 1}}
                    transition={{duration: 1.5, ease: "easeInOut"}}
                />
                </svg>

                <motion.div
                    className={"flex gap-8 items-center absolute right-1/2 translate-x-1/2 md:hidden py-4 px-5 border border-light/10 rounded-xl shadow-xl"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1.5}}
                >
                    {
                        NAV_ITEMS.map((item, index) => (
                            <Link key={index} href={item.href} className={"font-light text-light/70 hover:text-primary-100 hover:drop-shadow-2xl transition-all"}>
                                {item.title}
                            </Link>
                        ))
                    }
                </motion.div>

                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1.5}}
                >
                    <Button variant={"secondary"}>Contact Us</Button>
                </motion.div>
            </div>
        </div>
)
    ;
};

export default Header;