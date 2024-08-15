import React from 'react';

const AboutUsSection = () => {
    return (
        <div className={"flex w-full h-[45rem] overflow-hidden"}>
            <div className={"flex w-full h-full my-8 mx-40"}>
                <div className={"flex flex-col justify-center gap-8 w-2/3 h-full"}>
                    <h2 className={"font-semibold text-4xl w-9/12"}>
                    Our <span className="text-primary-100">dedicated</span> team will get you top-tier digital marketing results.
                    </h2>
                    <p className={"text-light/90 w-3/4"}>
                    With years of experience in digital marketing landspace, our team consists of industry veterans and innovative thinkers who bring a wealth of expertise to every project. 
                    <br></br><br></br>
                    We take pride in our client-centric approach. Our commitment is to deliver results that are not just effective but also aligned with your vision.
                    <br></br><br></br>
                    From crafting appealing web designs and optimizing them with SEO, to growing your business on social media, we ensure every aspect of your digital presence  is effectively managed to drive results and support your digital marketing success.
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
                            And many more who works with us!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;