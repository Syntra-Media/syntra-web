import React from 'react';
import {Button} from "@/components/ui/Button";
import Marquee from "@/components/magicui/marquee";

const TESTIMONIALS = [
    {
        name: "John Doe",
        company: "Company",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis id felis tincidunt ultricies. Donec in semper nunc. Curabitur nec nunc sed libero tempor dictum",
    },
    {
        name: "John Doe",
        company: "Company",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis id felis tincidunt ultricies. Donec in semper nunc. Curabitur nec nunc sed libero tempor dictum",
    },
    {
        name: "John Doe",
        company: "Company",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis id felis tincidunt ultricies. Donec in semper nunc. Curabitur nec nunc sed libero tempor dictum",
    },
    {
        name: "John Doe",
        company: "Company",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis id felis tincidunt ultricies. Donec in semper nunc. Curabitur nec nunc sed libero tempor dictum",
    },
]

const TestimonialsSection = () => {
    return (
        <div className={"flex w-full"}>
            <div className={"flex flex-col lg:flex-row gap-x-24 gap-y-8 w-full h-full mx-8 my-28 lg:mx-40 items-center "}>
                <div className={"w-full flex flex-col gap-8"}>
                    <h2 className={"font-semibold text-3xl lg:text-4xl"}>
                        Discover why our clients <span className={"text-primary"}>choose</span> us
                    </h2>
                    <p className={"text-light/90"}>
                        We take pride in our client-centric approach. Our commitment is to deliver results that are not just effective but also aligned with your vision.
                        <br/><br/>
                        From crafting appealing web designs and optimizing them with SEO, to growing your business on social media, we ensure every aspect of your digital presence  is effectively managed to drive results and support your digital marketing success.
                    </p>
                    <div className={"hidden lg:flex flex-col lg:flex-row items-center gap-6"}>
                        <Button className={"w-max"}>
                            Book Your FREE Strategy Call
                        </Button>
                        <div className={"flex gap-3 items-center"}>
                            <div className={"flex -space-x-6"}>
                                <div className={"w-12 h-12 rounded-full bg-white border border-bg-100"}></div>
                                <div className={"w-12 h-12 rounded-full bg-white border border-bg-100"}></div>
                                <div className={"w-12 h-12 rounded-full bg-white border border-bg-100"}></div>
                                <div className={"w-12 h-12 rounded-full bg-white border border-bg-100"}></div>
                            </div>
                            <div className={"flex flex-col font-light -space-y-2"}>
                                <p className={""}>
                                    50+
                                </p>
                                <p className={"text-light/70 text-sm"}>
                                    Satisfied clients
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col max-h-96"}>
                    <Marquee pauseOnHover vertical className={"[--duration:30s] lg:[mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"}>
                        {
                            TESTIMONIALS.map((testimonial, index) => (
                                <div key={index} className={`hover:bg-bg-100/10 transition-all flex flex-col gap-6 p-8 border border-neutral-100/10 rounded-lg`}>
                                    <p className={"text-light/90"}>{testimonial.testimonial}</p>
                                    <div className={"flex flex-col gap-1"}>
                                        <p>
                                            {testimonial.name}
                                        </p>
                                        <p className={"text-light/70"}>
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </Marquee>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;