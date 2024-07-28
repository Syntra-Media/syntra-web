import React, {useState} from 'react';
import Faq from "@/components/ui/Faq";
import Link from "next/link";

const QUESTIONS = [
    {
        title: "What is the purpose of this website?",
        description: "The purpose of this website is to showcase the capabilities of the Next.js framework and to demonstrate how to create a modern, responsive website using Tailwind CSS.",
    },
    {
        title: "How can I contribute to this project?",
        description: "You can contribute to this project by submitting a pull request on GitHub. Please make sure to follow the guidelines in the CONTRIBUTING.md file.",
    },
    {
        title: "Is this website open source?",
        description: "Yes, this website is open source and the code is available on GitHub. You are free to use, modify, and distribute the code as you see fit.",
    },
    {
        title: "Who created this website?",
        description: "This website was created by John Doe, a web developer based in New York City. John has over 10 years of experience in web development and has worked on a variety of projects for clients around the world.",
    },    {
        title: "Who created this website?",
        description: "This website was created by John Doe, a web developer based in New York City. John has over 10 years of experience in web development and has worked on a variety of projects for clients around the world.",
    },    {
        title: "Who created this website?",
        description: "This website was created by John Doe, a web developer based in New York City. John has over 10 years of experience in web development and has worked on a variety of projects for clients around the world.",
    },    {
        title: "Who created this website?",
        description: "This website was created by John Doe, a web developer based in New York City. John has over 10 years of experience in web development and has worked on a variety of projects for clients around the world.",
    },    {
        title: "Who created this website?",
        description: "This website was created by John Doe, a web developer based in New York City. John has over 10 years of experience in web development and has worked on a variety of projects for clients around the world.",
    },    {
        title: "Who created this website?",
        description: "This website was created by John Doe, a web developer based in New York City. John has over 10 years of experience in web development and has worked on a variety of projects for clients around the world.",
    },
]

const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className={"flex w-full h-screen overflow-hidden"}>
            <div className={"w-full h-full flex flex-col mx-32 my-16 gap-8"}>
                <h2 className={"font-semibold text-4xl"}>You might have <span className={"text-primary-100"}>questions...</span></h2>
                <div className={"flex flex-col gap-4 overflow-y-auto"}>
                    {
                        QUESTIONS.map((question, index) => (
                            <div onClick={() => setActiveIndex(index)} key={index}>
                                <Faq
                                    title={question.title}
                                    description={question.description}
                                    isActive={activeIndex === index}
                                    className={"cursor-pointer"}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default FaqSection;