import React from 'react';
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {Button} from "@/components/ui/Button";
import {BentoGrid, BentoGridItem} from "@/components/ui/BentoGrid";
import {
    IconBrandMeta,
    IconPencil,
    IconSearch,
    IconWorld,
    IconCode,
    IconScreenShare,
    IconPointer, IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandFacebook,
    IconBrandTwitter,
    IconBrandX
} from "@tabler/icons-react";
import OrbitingCircles from "@/components/magicui/OrbitingCircles";

const WebDesignSection = () => {
    return (
        <div className={"w-full h-full flex justify-center items-center group"}>
            <div className={"flex items-center h-full w-full justify-center"}>
                <div className={"w-12 h-12 flex justify-center items-center rounded-full border-2 border-light/15 text-light/60 group-hover:text-light group-hover:border-light/50 group-hover:w-14 group-hover:h-14 transition-all duration-1000"}>
                    <IconPencil/>
                </div>
                {/* line to next circle */}
                <div className={"w-8 h-0.5 bg-light/10 group-hover:bg-light/50 group-hover:w-10 transition-all duration-1000"}/>
                <div className={"w-16 h-16 flex justify-center items-center text-light/60 group-hover:text-light duration-1000 rounded-full border-2 border-primary/50 group-hover:w-18 group-hover:h-18 group-hover:border-primary transition-all"}>
                    <IconCode/>
                </div>
                <div className={"w-8 h-0.5 bg-light/10 transition-all group-hover:w-10 duration-1000 group-hover:bg-light/50"}/>
                <div className={"w-12 h-12 flex justify-center items-center text-light/60 group-hover:text-light rounded-full duration-1000 border-2 border-light/15 group-hover:w-14 group-hover:h-14 group-hover:border-light/50 transition-all"}>
                    <IconScreenShare />
                </div>
            </div>
        </div>
    )
}

const UIUXDesignSection = () => {
    return (
        <div className="w-full h-full flex justify-center items-center group">
            <div className={"rounded-lg w-full h-full flex overflow-hidden bg-slate-800 opacity-50 group-hover:opacity-100 transition-all duration-500"}>
                <div className={"flex mt-3 ml-3 w-full h-full bg-slate-900 rounded-tl-lg"}>
                    <div className={"relative flex h-2/3 w-1/2 mt-4 ml-4 bg-slate-700"}>
                        <div
                            className={"w-12 h-12 rounded-full flex justify-center items-center ml-20 mt-16 group-hover:ml-4 group-hover:mt-8 transition-all duration-1000 absolute"}
                        >
                            <IconPointer className={"text-light/80"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SEOComponent = () => {
    return (
        <div className="w-full h-full flex justify-center items-center group ">
            <div className={"relative flex items-end h-full w-full justify-center gap-4 opacity-50 group-hover:opacity-100 transition-all duration-500"}>
                <p className={"absolute m-2 left-0 top-0 transition-all"}>
                    Visitor Traffic
                </p>

                <div
                    className={"bg-blue-900/50 w-full h-10 group-hover:h-14 rounded-lg flex flex-col justify-end items-center transition-all duration-1000"}>
                    <p className={"text-light/60 text-xs mb-2 text-center"}>
                        201
                    </p>
                </div>
                <div
                    className={"bg-blue-900/50 w-full h-14 group-hover:h-20 rounded-lg flex flex-col justify-end items-center transition-all duration-1000"}>
                    <p className={"text-light/60 text-xs mb-2 text-center"}>
                        457
                    </p>
                </div>
                <div
                    className={"bg-blue-900/50 w-full h-20 group-hover:h-28 rounded-lg flex flex-col justify-end items-center transition-all duration-1000"}>
                    <p className={"text-light/60 text-xs mb-2 text-center"}>
                        781
                    </p>
                </div>
                <div
                    className={"bg-blue-900/50 w-full h-28 group-hover:h-32 rounded-lg flex flex-col justify-end items-center transition-all duration-1000"}>
                    <p className={"text-light/60 text-xs mb-2 text-center"}>
                        1.1k
                    </p>
                </div>
                <div
                    className={"bg-blue-900/50 w-full h-32 group-hover:h-40 group-hover:bg-primary/70 rounded-lg flex flex-col justify-end items-center transition-all duration-1000"}>
                    <p className={"text-light/60 text-xs mb-2 text-center group-hover:text-black"}>
                        2.6k
                    </p>
                </div>
            </div>
        </div>
    )
}

const SocialMediaComponent = () => {
    return (
        <div className="w-full h-full flex justify-center items-center group">
            <div className={"relative flex h-full w-full justify-center items-center opacity-50 transition-all duration-1000 group-hover:opacity-100"}>
                <OrbitingCircles className={"size-[40px] border-none bg-transparent"} duration={10} radius={60}>
                    <IconBrandInstagram/>
                </OrbitingCircles>
                <OrbitingCircles className={"size-[40px] border-none bg-transparent"} duration={10} delay={5} radius={60}>
                    <IconBrandLinkedin/>
                </OrbitingCircles>

                <OrbitingCircles className={"size-[30px] border-none bg-transparent"} duration={10} delay={5} radius={30} reverse>
                    <IconBrandFacebook/>
                </OrbitingCircles>
                <OrbitingCircles className={"size-[30px] border-none bg-transparent"} duration={10} radius={30} reverse>
                    <IconBrandX/>
                </OrbitingCircles>
            </div>
        </div>
    )
}

const Skeleton = () => (
    <div
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const ITEMS = [
    {
        title: "UI/UX Design",
        description: "Expert UI/UX design that enhances user experience and drives engagement.",
        header: <UIUXDesignSection/>
    },
    {
        title: "Web Design",
        description: "Custom web design that captivates and converts.",
        header: <WebDesignSection/>
    },
    {
        title: "SEO",
        description: "Boost your visibility and grow your business with expert SEO services.",
        header: <SEOComponent/>
    },
    {
        title: "Social Media Management",
        description: "Effective social media management that grows your brand and audience.",
        header: <SocialMediaComponent/>
    },

]

const ServicesSection = () => {
    return (
        <div className={"flex w-full overflow-hidden"}>
            <div className={"flex flex-col lg:flex-row w-full h-full mx-8 lg:mx-40 my-32 gap-32 items-center justify-center dark"}>
                <BentoGrid>
                    {
                        ITEMS.map((item, index) => (
                            <BentoGridItem
                                key={index}
                                title={item.title}
                                description={item.description}
                                header={item.header}
                                className={index === 1 || index === 2 ? "bg-bg-100/10 lg:col-span-2 border-neutral-100/10": "bg-bg-100/10 border-neutral-100/10"}
                            />
                        ))
                    }
                </BentoGrid>
                <div className={"w-full h-full flex flex-col gap-8 justify-center"}>
                    <h2 className={"font-semibold text-4xl"}>
                        Tired of poor digital marketing results? &ndash; <span className={"text-primary-100"}>We got you covered!</span>
                    </h2>
                    <p className={"text-light/90"}>
                    Frustrated by poor digital marketing results? We offer expert analysis, strategic planning, and hands-on management to turn your digital marketing around. 
                    <br></br><br></br>
                    Our experts handle every aspect of your digital marketing, from creating <span className="font-medium">compelling web designs</span> and optimizing it with <span className="font-medium">SEO</span>, to managing <span className="font-medium">social media</span> and executing targeted ad campaigns. We provide end-to-end solutions that drive real results and save you time, and money. 
                    <br></br><br></br>
                    <span className="font-medium">Book Your FREE Strategy Call to Learn How Our Experts Can Transform Your Business into a Digital Powerhouse.</span>
                    </p>
                    <Button variant={"default"} className={"w-max"}>Book Your FREE Strategy Call</Button>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;