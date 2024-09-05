import React, {useState} from 'react';
import Faq from "@/components/ui/Faq";
import Link from "next/link";

const QUESTIONS = [
    {
        title: "What services does Syntra Media offer?",
        description: "At Syntra Media, we deliver customized digital marketing services—web design, SEO, social media management, and content creation—to boost your digital presence and drive measurable business growth."
    },
    {
        title: "How do you develop a digital marketing strategy?",
        description: "Our dedicated team will assess your current digital marketing strategy and pinpoint areas for improvement. We'll also analyze your top competitors' digital marketing efforts to ensure we can help you outperform them."
    },
    {
        title: "Can you provide case studies or examples of past work?",
        description: "Absolutely! We can provide detailed case studies and examples of our past work that showcase how we've helped businesses like yours achieve their digital marketing goals. Check them out here."
    },
    {
        title: "How often will I receive updates on my project?",
        description: "You'll receive regular updates on your project through our client portal, where you can track progress, view reports, and communicate directly with our team. We keep you informed every step of the way to ensure transparency and alignment with your goals.",
    },
    {
        title: "How do you handle client data and privacy?",
        description: "We take client data and privacy very seriously. Our client portal is secured with advanced encryption protocols to protect your information. We follow strict privacy policies to ensure your data is handled with the utmost care and confidentiality, ensuring that only authorized team members have access."
    },
]

const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className={"flex w-full overflow-hidden"}>
            <div className={"w-full h-full flex flex-col mx-8 lg:mx-40 my-24 gap-8"}>
                <h2 className={"font-semibold text-4xl"}>You might have <span className={"text-primary-100"}>questions...</span></h2>
                <div className={"flex flex-col gap-4 lg:gap-6 overflow-y-auto"}>
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
                <div className={"w-full flex justify-center font-light"}>
                    <p>
                        If you have more questions, <Link href={"/contact"}><span className={"text-primary underline underline-offset-4"}>contact us!</span></Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FaqSection;