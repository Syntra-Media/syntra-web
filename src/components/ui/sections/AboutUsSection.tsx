import React from 'react';
import Image from 'next/image';

const Contractors = ["/images/team/Syntra-Media-Alphan-Bartu-Altıntaş-Contractor.jpeg", "/images/team/Syntra-Media-Kerem-Kenan-Eren-Contractor.png", "/images/team/Syntra-Media-Taha-Yücel-Contractor.png", "/images/team/Syntra-Media-İhsan-Çarkcı-Contractor.jpeg"]

const AboutUsSection = () => {
    return (
        <div className={"flex w-full overflow-hidden"}>
            <div className={"flex flex-col gap-y-12 lg:gap-48 3xl:gap-80  items-center lg:flex-row w-full h-full my-28 mx-8 lg:mx-40"}>
                <div className={"flex flex-col justify-center gap-8 w-full h-full"}>
                    <h2 className={"font-semibold text-4xl"}>
                    Our <span className="text-primary-100">dedicated</span> team will get you<br/> top-tier digital marketing results.
                    </h2>
                    <p className={"text-light/90"}>
                    With years of experience in digital marketing landspace, our team consists of industry veterans and innovative thinkers who bring a wealth of expertise to every project. 
                    <br></br><br></br>
                    We take pride in our client-centric approach. Our commitment is to deliver results that are not just effective but also aligned with your vision.
                    <br></br><br></br>
                    From crafting appealing web designs and optimizing them with SEO, to growing your business on social media, we ensure every aspect of your digital presence  is effectively managed to drive results and support your digital marketing success.
                    </p>
                </div>
                <div className={"flex flex-col h-full justify-center items-center gap-8"}>
                    <div className={"flex w-full gap-8 justify-center"}>
                        <div className={"flex w-40 flex-col items-center"}>
                            <Image src="/images/team/Syntra-Media-Furkan-Esen-Kurucu-Ortak.jpg" alt="Syntra Media Kurucu Ortağı Furkan Esen"  width="512" height="512" className={"w-40 h-40 rounded-full bg-white"} />
                            <p className={"text-lg mt-3"}>Furkan Esen</p>
                            <p className={"text-light/70 mt-2"}>Co-founder</p>
                        </div>
                        <div className={"flex w-40 flex-col items-center"}>
                        <Image src="/images/team/Syntra-Media-Emir-Ayaz-Kurucu-Ortak.jpg" alt="Syntra Media Kurucu Ortağı Emir Ayaz"  width="512" height="512" className={"w-40 h-40 rounded-full bg-white"} />
                            <p className={"text-lg mt-3"}>Emir Ayaz</p>
                            <p className={"text-light/70 mt-2"}>Co-founder</p>
                        </div>
                    </div>
                    <div className={"flex flex-col items-center"}>
                        <div className={"flex -space-x-16"}>
                            {
                                Contractors.map((_, index) => (
                                    <Image src={Contractors[index]} alt={`Syntra Media Kontraktörü ${index}`} key={index} width="512" height="512" className={"w-32 h-32 rounded-full bg-white border border-neutral-900"} />
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