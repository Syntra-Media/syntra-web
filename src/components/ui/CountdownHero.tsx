"use client"

import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {Instagram, Linkedin, Twitter} from "lucide-react";
import CountdownCard from "@/components/ui/CountdownCard";
import Link from "next/link";

const CountdownHero = () => {
    const [time, setTime] = useState({days: 0, hours: 0, minutes: 0})

    useEffect(() => {
        console.log("useEffect")

        const t1 = new Date();
        const t2 = new Date('2024-09-01');

        const diff = t2.getTime() - t1.getTime();

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        setTime({days, hours, minutes})
    }, []);

    return (
        <div className={"flex flex-col gap-8 w-full h-screen justify-center items-center overflow-hidden"}>
            <div className={"absolute my-8 top-0"}>
                <svg width="18" height="38" viewBox="0 0 18 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M0 18.1485L6.13333 5.99242L11.6 3.08182L18 0L9.32727 18.1485H18L11.4667 32.5303L6.13333 34.9273L0 37.6667L9.32727 18.1485H0Z"
                        stroke={"#FFC300"}
                        initial={{pathLength: 0}}
                        animate={{pathLength: 1}}
                        transition={{duration: 1.5, ease: "easeInOut"}}
                    />
                </svg>
            </div>
            <motion.h1
                className={"text-7xl text-center font-semibold lg:text-6xl md:text-5xl sm:text-3xl mobile:text-3xl mx-52 w-3/4"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1.5}}
            >
                Elevate your business with our <motion.span initial={{color: "#eeeeee"}} animate={{color: "#FFD60A"}} transition={{delay:1.2}}>expert</motion.span> web marketing agency.
            </motion.h1>
            <div className={"flex gap-4"}>
                <CountdownCard title={String(time.days)} description={"day"}/>
                <CountdownCard title={String(time.hours)} description={"hours"} delay={0.5}/>
                <CountdownCard title={String(time.minutes)} description={"minutes"} delay={1}/>
            </div>
            <div className={"flex flex-col gap-4 absolute bottom-0 my-8 items-center"}>
                <motion.div
                    className={"flex gap-4"}
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:2}}
                >
                    <Link href={"https://www.linkedin.com/company/syntra-media/"}>
                        <Linkedin className={"w-10 h-10 text-light/60 hover:text-light transition-all duration-300"} />
                    </Link>
                    <Link href={"https://www.instagram.com/syntramedia"}>
                        <Instagram  className={"w-10 h-10 text-light/60 hover:text-light transition-all duration-300"}/>

                    </Link>
                    <Link href={"https://www.x.com/syntramedia/"}>
                        <Twitter className={"w-10 h-10 text-light/60 hover:text-light transition-all duration-300"}/>
                    </Link>
                </motion.div>
                <motion.p className={"text-sm text-light/60"} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}>© 2024 Syntra Media. All Rights Reserved.</motion.p>
            </div>
        </div>
    );
};

export default CountdownHero;