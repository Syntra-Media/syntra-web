import React from 'react';
import Image from "next/image";

const Images = [
    "/logos/microsoft.png",
    "/logos/hubspot.png",
    "/logos/stripe.png",
]

const LogoSection = () => {
    return (
        <div className={"flex gap-16 w-full h-80 justify-center items-center"}>
            {Images.map((image, index) => (
                <Image src={image} width={256} height={256} className={"w-36"} alt={"logo"} key={index}/>
            ))}
        </div>
    );
};

export default LogoSection;