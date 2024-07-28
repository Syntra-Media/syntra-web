import React from 'react';

const AboutUsSection = () => {
    return (
        <div className={"flex w-full h-[45rem] overflow-hidden"}>
            <div className={"flex w-full h-full my-8 mx-40"}>
                <div className={"flex flex-col justify-center gap-8 w-2/3 h-full"}>
                    <h2 className={"font-semibold text-4xl w-2/3"}>
                        The team that will <span className={"text-primary-100"}>transform</span> your digital presence
                    </h2>
                    <p className={"text-light/90 w-3/4"}>
                        Our dedicated team of digital marketing professionals is committed to bringing your brand&lsquos vision to life. With expertise in web design, SEO, content creation, and social media management, we collaborate to create strategies that drive results. Passionate about innovation and excellence, we work tirelessly to ensure your online presence is not only strong but also impactful, helping your business reach new heights. Trust us to be your partners in achieving digital success.
                    </p>
                </div>
                <div className={"flex flex-col w-1/3 h-full justify-center items-center gap-8"}>
                    <div className={"flex w-full gap-8 justify-center"}>
                        <div className={"flex flex-col items-center"}>
                            <div className={"w-40 h-40 rounded-full bg-white"}></div>
                            <p className={"text-lg mt-3"}>Furkan Esen</p>
                            <p className={"text-light/70 mt-2"}>CEO</p>
                        </div>
                        <div className={"flex flex-col items-center"}>
                            <div className={"w-40 h-40 rounded-full bg-white"}></div>
                            <p className={"text-lg mt-3"}>Emir Ayaz</p>
                            <p className={"text-light/70 mt-2"}>CEO</p>
                        </div>
                    </div>
                    <div className={"flex flex-col items-center"}>
                        <div className={"flex"}>
                            {
                                Array.from({length: 4}).map((_, index) => (
                                    <div key={index} className={"w-32 h-32 rounded-full bg-white border border-neutral-900 -mx-6"}></div>
                                ))
                            }
                        </div>
                        <p className={"mt-4 text-light/80"}>
                            And many more who works for us!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;