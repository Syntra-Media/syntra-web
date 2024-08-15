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
                        <CarouselItem className={"flex h-full justify-center items-center"}>1</CarouselItem>
                        <CarouselItem>2</CarouselItem>
                        <CarouselItem>3</CarouselItem>
                        <CarouselItem>4</CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
                <div className={"w-full h-full flex flex-col gap-8"}>
                    <h2 className={"font-semibold text-4xl"}>
                        Tired of poor digital marketing results? &ndash; <span className={"text-primary-100"}>We got you covered!</span>
                    </h2>
                    <p className={"text-light/90"}>
                    Frustrated by poor digital marketing results? We offer expert analysis, strategic planning, and hands-on management to turn your digital marketing around. 
                    <br></br><br></br>
                    Our experts handle every aspect of your digital marketing, from creating compelling web designs and optimizing it with SEO, to managing social media and executing targeted ad campaigns. We provide end-to-end solutions that drive real results and save you time, and money. 
                    <br></br><br></br>
                    <span className="font-medium">Book Your FREE Strategy Call to Learn How Our Experts Can Transform Your Business into a Digital Powerhouse.</span>
                    </p>
                    <Button variant={"default"} className={"w-5/12"}>Book Your FREE Strategy Call</Button>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;