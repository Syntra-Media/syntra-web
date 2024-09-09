import React from 'react';
import {Button} from "@/components/ui/Button";
import {BentoGrid, BentoGridItem} from "@/components/ui/BentoGrid";
import {IconBrandMeta, IconPencil, IconSearch, IconWorld} from "@tabler/icons-react";

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const ITEMS = [
    {
        title: "UI/UX Design",
        description: "Expert UI/UX design that enhances user experience and drives engagement.",
        icon: <IconPencil/>,
        header: <Skeleton/>
    },
    {
        title: "Web Design",
        description: "Custom web design that captivates and converts.",
        icon: <IconWorld/>,
        header: <Skeleton/>
    },
    {
        title: "SEO",
        description: "Boost your visibility and grow your business with expert SEO services.",
        icon: <IconSearch/>,
        header: <Skeleton/>
    },
    {
        title: "Social Media Management",
        description: "Effective social media management that grows your brand and audience.",
        icon: <IconBrandMeta/>,
        header: <Skeleton/>
    },

]

const ServicesSection = () => {
    return (
        <div className={"flex w-full overflow-hidden"}>
            <div className={"flex flex-col lg:flex-row w-full h-full mx-8 lg:mx-40 my-32 gap-32 items-center justify-center dark"}>
                <BentoGrid>
                    {
                        ITEMS.map((item, index) => (
                            <BentoGridItem
                                key={index}
                                title={item.title}
                                description={item.description}
                                icon={item.icon}
                                header={item.header}
                                className={index === 1 || index === 2 ? "bg-bg-100/10 lg:col-span-2 border-neutral-100/10": "bg-bg-100/10 border-neutral-100/10"}
                            />
                        ))
                    }
                </BentoGrid>
                <div className={"w-full h-full flex flex-col gap-8 justify-center"}>
                    <h2 className={"font-semibold text-4xl"}>
                        Tired of poor digital marketing results? &ndash; <span className={"text-primary-100"}>We got you covered!</span>
                    </h2>
                    <p className={"text-light/90"}>
                    Frustrated by poor digital marketing results? We offer expert analysis, strategic planning, and hands-on management to turn your digital marketing around. 
                    <br></br><br></br>
                    Our experts handle every aspect of your digital marketing, from creating <span className="font-medium">compelling web designs</span> and optimizing it with <span className="font-medium">SEO</span>, to managing <span className="font-medium">social media</span> and executing targeted ad campaigns. We provide end-to-end solutions that drive real results and save you time, and money. 
                    <br></br><br></br>
                    <span className="font-medium">Book Your FREE Strategy Call to Learn How Our Experts Can Transform Your Business into a Digital Powerhouse.</span>
                    </p>
                    <Button variant={"default"} className={"w-max"}>Book Your FREE Strategy Call</Button>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;