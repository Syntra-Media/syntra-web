"use client"

import React from 'react';
import Image from "next/image";
import {motion, useMotionValue} from "framer-motion";
import {cn} from "@/utils/cn";

const Images = [
    "/logos/RainbowVeterinerKlinigi.png",
    "/logos/ArtCode.png",
    "/logos/Xpertweb.png",
    "/logos/Sapphireall.png",
    "/logos/Masalapp.webp",
    "/logos/CollectiveTherapy.webp",
    "/logos/Focusify.png",
]

const LogoSection = () => {
    return (
        <div className={"relative h-80 container"}>
            <div className={"w-full h-full flex justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]"}>
                <div className={"flex gap-24 items-center h-full grayscale"}>
                    {Images.map((image, index) => (
                        <Image draggable={false} src={image} alt={"Logo"} width={140} height={140} key={index} className={cn("object-contain", image === "/logos/RainbowVeterinerKlinigi.png" && "invert", image === "/logos/Xpertweb.png" && "invert")}/>
                    ))
                    }
                </div>
            </div>
        </div>
    );
};

export default LogoSection;