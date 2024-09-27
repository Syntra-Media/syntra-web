"use client";

import React, {useEffect} from 'react';
import {animate, motion, useMotionValue, useTransform} from "framer-motion";
import {Input} from "@/components/ui/Input";
import {Button} from "@/components/ui/Button";
import {ChevronDown} from "lucide-react";

import en from '@/localization/en.json';
import tr from '@/localization/tr.json';

const LandingHero = ({locale}: any) => {
    const [selectedLocale, setSelectedLocale] = React.useState<any>(locale === "en" ? en : tr);

    const InputMotion = motion(Input);
    const ButtonMotion = motion(Button);

    const handleSectionScroll = () => {
        const section = document.getElementById("cta-section");
        if (section) {
            section.scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <div className={"w-full h-screen bg-radial flex flex-col justify-center items-center gap-4 md:gap-8"}>
            <motion.h1
                className={"font-medium text-3xl text-center lg:text-6xl 3xl:text-7xl"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1.5}}
            >
                {locale === "en" ? (
                    <p>
                        Getting
                        <motion.span initial={{color: "#eeeeee"}} animate={{color: "#FFD60A"}} transition={{delay: 1.2}}> top-tier </motion.span>
                        digital marketing results,<br/> <span className={"text-primary-100"}>without the high costs.</span>
                    </p>
                ) : (
                    <p>
                        <motion.span initial={{color: "#eeeeee"}} animate={{color: "#FFD60A"}} transition={{delay: 1.2}}>Yüksek maliyetler olmadan</motion.span> dijital<br/>
                        pazarlamanın <motion.span initial={{color: "#eeeeee"}} animate={{color: "#FFD60A"}} transition={{delay: 1.2}}>etkisini</motion.span> hissedin.
                    </p>
                    )
                }
            </motion.h1>
            <motion.p
                className={"text-center text-sm text-light mx-8 lg:text-lg lg:w-1/2 font-light"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1.5, delay: 0.5}}
            >
                {selectedLocale.hero.subheader}
            </motion.p>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1}}
                className={"flex flex-col justify-center items-center relative"}
            >
                <div className={"w-full flex justify-center"}>
                    <InputMotion type={"text"} placeholder={selectedLocale.hero.email_placeholder} className={"w-full pr-96 hidden lg:flex"}
                        initial={{x: -75}}
                        animate={{x: 0}}
                        transition={{delay:1, duration:1.12, ease: "easeOut"}}
                    />
                    <ButtonMotion variant={"default"} className={"hidden lg:flex lg:absolute lg:right-0 lg:rounded-l-none"}
                        initial={{x: 75}}
                        animate={{x: 0}}
                        transition={{delay:1, duration:1.12, ease: "easeOut"}}
                        onClick={handleSectionScroll}
                    >
                        {
                            selectedLocale.hero.cta_button
                        }
                    </ButtonMotion>
                </div>
                <motion.p
                    className={"text-light/60 text-xs hidden lg:flex my-4"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1}}
                >
                    {
                        selectedLocale.hero.input_caption
                    }
                </motion.p>
            </motion.div>
            <motion.div
                className={"flex flex-col text-center absolute bottom-0 my-4 items-center w-1/2"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1}}
            >
                <p className={"text-light/80 hidden lg:flex gap-1"}>
                    {selectedLocale.hero.footer_one}
                </p>
                <p className={"text-light/60 text-sm hidden lg:flex"}>
                    {selectedLocale.hero.footer_two}
                </p>
                <ChevronDown className={"my-4"}/>
            </motion.div>
        </div>
    );
};

export default LandingHero;