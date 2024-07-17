"use client";

import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {MenuIcon} from "lucide-react";
import {cn} from "@/utils/cn";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let handler = (e) => {
            if (e.target.closest(".menu") || e.target.closest("button")) return;
            setIsOpen(false);
        }

        window.addEventListener("mousedown", handler);
    }, []);

    return (
        <div className={"absolute flex w-full h-20"}>
            <div className={"flex w-full h-full my-2 justify-between items-center mx-4"}>
                <motion.div
                    className={cn("flex items-center transition-all", isOpen ? "rotate-90" : "")}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1.5}}
                >
                    <Button variant={"ghost"} onClick={() => setIsOpen(!isOpen)}>
                        <MenuIcon size={24}/>
                    </Button>
                </motion.div>
                <motion.div
                    className={cn("menu z-10 fixed w-80 h-screen bg-neutral-900/70 backdrop-blur top-0 left-0 ", isOpen ? "" : "hidden")}
                    initial={{opacity: 0, x: -100}}
                    animate={isOpen ? {opacity: 1, x: 0} : {opacity: 0, x: -100}}
                    transition={{duration: 1.5}}
                >
                    TODO: header nav
                </motion.div>

                <svg width="18" height="38" viewBox="0 0 18 38" fill="none" xmlns="http://www.w3.org/2000/svg"
                 className={"absolute right-1/2 translate-x-1/2"}>
                <motion.path
                    d="M0 18.1485L6.13333 5.99242L11.6 3.08182L18 0L9.32727 18.1485H18L11.4667 32.5303L6.13333 34.9273L0 37.6667L9.32727 18.1485H0Z"
                    stroke={"#FFC300"}
                    initial={{pathLength: 0}}
                    animate={{pathLength: 1}}
                    transition={{duration: 1.5, ease: "easeInOut"}}
                />
                </svg>
            <motion.div
                className={"flex items-center"}
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