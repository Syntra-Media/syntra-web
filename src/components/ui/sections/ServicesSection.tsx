import React from 'react';
import {Button} from "@/components/ui/Button";

const ServicesSection = () => {
    return (
        <div className={"flex w-full h-[30rem] overflow-hidden"}>
            <div className={"flex w-full h-full mx-32 gap-32"}>
                <div className={"grid w-full h-full grid-cols-2 grid-rows-2 gap-8"}>
                    <div className={"bg-neutral-900/30 backdrop-blur rounded-lg border border-light/10"}>
                        <div className={"w-full h-full flex flex-col m-4 gap-2"}>
                            <p className={"font-medium"}>Web Development</p>
                            <p className={"text-sm"}>Crafting Stunning, Responsive Websites to Elevate Your
                                Brand</p>
                        </div>
                    </div>
                    <div className={"bg-neutral-900/30 backdrop-blur rounded-lg border border-light/10"}>
                        <div className={"w-full h-full flex flex-col m-4 gap-2"}>
                            <p className={"font-medium"}>Web Development</p>
                            <p className={"text-sm"}>Crafting Stunning, Responsive Websites to Elevate Your
                                Brand</p>
                        </div>
                    </div>
                    <div className={"bg-neutral-900/30 backdrop-blur rounded-lg border border-light/10"}>
                        <div className={"w-full h-full flex flex-col m-4 gap-2"}>
                            <p className={"font-medium"}>Web Development</p>
                            <p className={"text-sm"}>Crafting Stunning, Responsive Websites to Elevate Your
                                Brand</p>
                        </div>
                    </div>
                    <div className={"bg-neutral-900/30 backdrop-blur rounded-lg border border-light/10"}>
                        <div className={"w-full h-full flex flex-col m-4 gap-2"}>
                            <p className={"font-medium"}>Web Development</p>
                            <p className={"text-sm"}>Crafting Stunning, Responsive Websites to Elevate Your
                                Brand</p>
                        </div>
                    </div>
                </div>
                <div className={"w-full h-full flex flex-col gap-8"}>
                    <h2 className={"font-semibold text-4xl"}>
                        Unleash your business <span className={"text-primary-100"}>potential</span> with our premier
                        services
                    </h2>
                    <p className={"text-light/90"}>
                        Unlock new levels of success with our comprehensive suite of premier services. From cutting-edge web design and development to strategic SEO and meticulous website optimization, we provide everything your business needs to thrive in the digital world. Our team of experts works closely with you to create customized solutions that drive traffic, enhance user engagement, and increase conversions. With our innovative strategies and unwavering commitment to excellence, we help you realize your business's full potential and achieve lasting growth.
                    </p>
                    <Button variant={"default"} className={"w-40"}>View our work</Button>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;