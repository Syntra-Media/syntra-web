"use client"

import React from 'react';
import Image from "next/image";
import {cn} from "@/utils/cn";
import Marquee from "@/components/magicui/Marquee";
import { motion } from 'framer-motion';
const Images = [
    "/images/logos/RainbowVeterinerKlinigi.png",
    "/images/logos/ArtCode.png",
    "/images/logos/Xpertweb.png",
    "/images/logos/Sapphireall.png",
    "/images/logos/Masalapp.webp",
    "/images/logos/CollectiveTherapy.webp",
    "/images/logos/Focusify.png",
]

const LogoSection = () => {
    return (
        <motion.div className={"relative h-60 container"}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className={"flex w-full h-full"}>
                <Marquee className={"[--duration:20s] [mask-image:linear-gradient(to_right,transparent,white,transparent)]"}>
                    {Images.map((image, index) => (
                        <Image draggable={false} src={image} alt={"Logo"} width={140} height={140} key={index} className={cn("object-contain w-36 grayscale mx-4 lg:mx-8 opacity-70 hover:opacity-100 hover:grayscale-0 transition-all", image === "/logos/RainbowVeterinerKlinigi.png" && "invert", image === "/logos/Xpertweb.png" && "invert")}/>
                    ))
                    }
                </Marquee>
            </div>
        </motion.div>
    );
};

export default LogoSection;