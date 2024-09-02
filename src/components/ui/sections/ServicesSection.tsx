import React from 'react';
import {Button} from "@/components/ui/Button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/Carousel"


const ServicesSection = () => {
    return (
        <div className={"flex w-full h-[30rem] overflow-hidden"}>
            <div className={"flex w-full h-full mx-32 gap-32"}>
                <Carousel className={"w-full h-full"}>
                    <CarouselContent className={"h-full"}>
                        <CarouselItem className={"flex h-[30rem] justify-center items-center"}>
                            <div className={"w-full h-full border border-light/20 rounded-lg"}>

                            </div>
                        </CarouselItem>
                        <CarouselItem className={"flex h-[30rem] justify-center items-center"}>
                            <div className={"w-full h-full border border-light/20 rounded-lg"}>

                            </div>
                        </CarouselItem>
                        <CarouselItem className={"flex h-[30rem] justify-center items-center"}>
                            <div className={"w-full h-full border border-light/20 rounded-lg"}>

                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
                <div className={"w-full h-full flex flex-col gap-8 justify-center"}>
                    <h2 className={"font-semibold text-4xl"}>
                        Unleash your business <span className={"text-primary-100"}>potential</span> with our premier
                        services
                    </h2>
                    <p className={"text-light/90"}>
                        Unlock new levels of success with our comprehensive suite of premier services. From cutting-edge web design and development to strategic SEO and meticulous website optimization, we provide everything your business needs to thrive in the digital world. Our team of experts works closely with you to create customized solutions that drive traffic, enhance user engagement, and increase conversions. With our innovative strategies and unwavering commitment to excellence, we help you realize your business&lsquos full potential and achieve lasting growth.
                    </p>
                    <Button variant={"default"} className={"w-40"}>View our work</Button>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;