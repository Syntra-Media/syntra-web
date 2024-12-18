"use client"

import React from "react";
import {Button} from "@/components/ui/Button";
import Marquee from "@/components/magicui/Marquee";
import { motion } from 'framer-motion';

import tr from '@/localization/tr.json'
import en from '@/localization/en.json'

const TESTIMONIALS = [
    {
        name: "Victor Shyptur",
        company: "The Redemption Community",
        testimonial: "We've worked with Syntra Media for crafting a visually-appealing web design for our mens growth community. I can full heartedly say that they've met what they promised. Totally recommend.",
    },
    {
        name: "Xander Straskins",
        company: "Extrask Game Company",
        testimonial: "They are man of their words. Very easy to work with and they deliver what they promise. They were able to create me a unique and visually appealing website for my game company.",
    },
    {
        name: "Vicky Hikari",
        company: "The Art Code Studios",
        testimonial: "We've worked with UI/UX design for our art studio's future website. They were able to deliver a design that resonates well with our brand perception and values. Highly recommend.",
    },
    {
        name: "Fatma Arslan",
        company: "The Wonderfuel Station",
        testimonial: "We've worked with Syntra Media in regards to our brochure designs. They were able to create eye-catching visuals that not just look fancy but also convey the brand message of ours. Great job.",
    },
]

const TestimonialsSection = ({locale}: {locale: string}) => {
    const [selectedLocale, setSelectedLocale] = React.useState(locale === "en" ? en : tr)


    const handleSectionScroll = () => {
        const section = document.getElementById("cta-section");
        if (section) {
            section.scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <motion.div className={"flex w-full"}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className={"flex flex-col lg:flex-row gap-x-24 gap-y-8 w-full h-full mx-8 my-28 lg:mx-40 items-center "}>
                <div className={"w-full flex flex-col gap-8"}>
                    <h2 className={"font-semibold text-3xl lg:text-4xl"}>
                        {
                            locale === "en" ? (
                                <span>
                                    Discover why our clients <span className={"text-primary-100"}>choose</span> us
                                </span>
                            ) : (
                                <span>
                                    Müşterilerimiz neler <span className={"text-primary-100"}>düşünüyor?</span>
                                </span>
                            )
                        }
                    </h2>
                    {
                        selectedLocale.testimonials.text.replaceAll("\n", "<br/>").split("<br/>").map((text, index) => (
                            <p key={index} className={"text-light/90 text-lg"}>
                                {text}
                            </p>
                        ))
                    }
                    <div className={"hidden lg:flex flex-col lg:flex-row items-center gap-6"}>
                        <Button className={"w-max"} onClick={handleSectionScroll}>
                            {selectedLocale.hero.cta_button}
                        </Button>
                        <div className={"flex gap-3 items-center"}>
                            <div className={"hidden -space-x-6"}>
                                <div className={"w-12 h-12 rounded-full bg-white border border-bg-100"}></div>
                                <div className={"w-12 h-12 rounded-full bg-white border border-bg-100"}></div>
                                <div className={"w-12 h-12 rounded-full bg-white border border-bg-100"}></div>
                                <div className={"w-12 h-12 rounded-full bg-white border border-bg-100"}></div>
                            </div>
                            <div className={"flex flex-col font-light -space-y-2"}>
                                <p className={""}>
                                    20+
                                </p>
                                <p className={"text-light/70 text-sm"}>
                                    {
                                        selectedLocale.testimonials.satisfied_clients
                                    }
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
        </motion.div>
    );
};

export default TestimonialsSection;