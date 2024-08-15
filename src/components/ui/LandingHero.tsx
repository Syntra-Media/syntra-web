"use client";

import React, {useEffect} from 'react';
import {animate, motion, useMotionValue, useTransform} from "framer-motion";
import {Input} from "@/components/ui/Input";
import {Button} from "@/components/ui/Button";
import {ChevronDown} from "lucide-react";

const LandingHero = () => {
    const count = useMotionValue(0)
    const rounded = useTransform(count, value => Math.round(value))

    const InputMotion = motion(Input);
    const ButtonMotion = motion(Button);

    useEffect(() => {
        const controls = animate(count, 50, {
            duration: 2,
            ease: "easeInOut",
            delay: 1,
        });

        return () => controls.stop();
    }, [count]);


    return (
        <div className={"w-full h-screen bg-radial flex flex-col justify-center items-center gap-8"}>
            <motion.h1
                className={"text-7xl text-center font-semibold lg:text-6xl md:text-5xl sm:text-3xl mobile:text-3xl mx-52 w-4/5"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1.5}}
            >
                Getting
                <motion.span initial={{color: "#eeeeee"}} animate={{color: "#FFD60A"}} transition={{delay: 1.2}}> top-tier </motion.span> 
                 digital marketing results, <span className={"text-primary-100"}>without the high costs.</span>
            </motion.h1>
            <motion.p
                className={"text-center text-lg text-light w-7/12 font-light"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1.5, delay: 0.5}}
            >
                Taking over the guesswork – Our expert team at Syntra Media will help you achieve your website, social media, and SEO goals, saving you time and money.
            </motion.p>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1}}
                className={"flex flex-col w-5/12 justify-center items-center relative"}
            >
                <div className={"w-full flex"}>
                    <InputMotion type={"text"} placeholder={"Type your favorite email address"} className={"w-full"}
                        initial={{x: -75}}
                        animate={{x: 0}}
                         transition={{delay:1, duration:1.12, ease: "easeOut"}}
                    />
                    <ButtonMotion variant={"default"} className={"absolute right-0 rounded-l-none"}
                        initial={{x: 75}}
                        animate={{x: 0}}
                          transition={{delay:1, duration:1.12, ease: "easeOut"}}

                    >Book Your FREE Strategy Call</ButtonMotion>
                </div>
                <motion.p
                    className={"text-light/60 text-xs my-4"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1}}
                >
                    Book your free strategy call with our experts to get started now. 
                </motion.p>
            </motion.div>
            <motion.div
                className={"flex flex-col text-center absolute bottom-0 my-4 items-center w-1/2"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1}}
            >
                <p className={"text-light/80"}>Over <motion.span>{rounded}</motion.span> happy clients & firms</p>
                <p className={"text-light/60 text-sm"}>be part of those who have achieved their marketing goals</p>
                <ChevronDown className={"my-4"}/>
            </motion.div>
        </div>
    );
};

export default LandingHero;