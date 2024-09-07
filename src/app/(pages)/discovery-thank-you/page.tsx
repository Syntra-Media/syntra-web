"use client";

import React from 'react';
import {CalendarCheck} from "lucide-react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import Link from "next/link";

const DiscoveryThankYou = () => {
    return (
        <div className={"relative w-full h-screen flex flex-col justify-center items-center gap-4"}>
            <div className={"flex flex-col items-center text-primary text-8xl"}>
                <svg width="18" height="38" viewBox="0 0 18 38" fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     className={"w-24 h-24"}
                >
                    <motion.path
                        d="M0 18.1485L6.13333 5.99242L11.6 3.08182L18 0L9.32727 18.1485H18L11.4667 32.5303L6.13333 34.9273L0 37.6667L9.32727 18.1485H0Z"
                        stroke={"#FFC300"}
                        initial={{pathLength: 0}}
                        animate={{pathLength: 1}}
                        transition={{duration: 1.5, ease: "easeInOut"}}
                    />
                </svg>
                <h2>
                    Thanks!
                </h2>
            </div>
            <p className={"text-lg"}>
                We have booked your discovery call. See you soon!
            </p>
            <Button className={"w-max"}>
                <Link href={"/"}>
                    Go back to home
                </Link>
            </Button>
        </div>
    );
};

export default DiscoveryThankYou;