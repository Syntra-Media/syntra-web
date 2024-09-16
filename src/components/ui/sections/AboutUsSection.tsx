"use client";

import React from 'react';
import Image from 'next/image';

import tr from '@/localization/tr.json'
import en from '@/localization/en.json'

const Contractors = ["/images/team/Syntra-Media-Alphan-Bartu-Altıntaş-Contractor.jpeg", "/images/team/Syntra-Media-Kerem-Kenan-Eren-Contractor.png", "/images/team/Syntra-Media-Taha-Yücel-Contractor.png", "/images/team/Syntra-Media-İhsan-Çarkcı-Contractor.jpeg"]

const AboutUsSection = ({locale}: {locale: string}) => {
    const [selectedLocale, setSelectedLocale] = React.useState(locale === "en" ? en : tr)

    return (
        <div className={"flex w-full overflow-hidden"}>
            <div className={"flex flex-col gap-y-12 lg:gap-48 3xl:gap-80  items-center lg:flex-row w-full h-full my-28 mx-8 lg:mx-40"}>
                <div className={"flex flex-col justify-center gap-8 w-full h-full"}>
                    <h2 className={"font-semibold text-4xl"}>
                        {
                            locale === "en" ? (
                                <span>
                                    Our <span className="text-primary-100">dedicated</span> team will get you<br/> top-tier digital marketing results.
                                </span>
                            ) : (
                                <span>
                                    <span className={"text-primary-100"}>Uzman ekibimiz</span>, size birinci sınıf dijital pazarlama sonuçları getirir.
                                </span>
                            )
                        }
                    </h2>
                    {
                        selectedLocale.aboutus.text.replaceAll("\n", "<br/>").split("<br/>").map((text, index) => (
                            <p key={index} className={"text-lg text-light/90"}>
                                {text}
                            </p>
                        ))
                    }
                </div>
                <div className={"flex flex-col h-full justify-center items-center gap-8"}>
                    <div className={"flex w-full gap-8 justify-center"}>
                        <div className={"flex w-40 flex-col items-center"}>
                            <Image src="/images/team/Syntra-Media-Furkan-Esen-Kurucu-Ortak.jpg" alt="Syntra Media Kurucu Ortağı Furkan Esen"  width="512" height="512" className={"w-40 h-40 rounded-full bg-white"} />
                            <p className={"text-lg mt-3"}>Furkan Esen</p>
                            <p className={"text-light/70 mt-2"}>
                                {selectedLocale.aboutus.co_founder}
                            </p>
                        </div>
                        <div className={"flex w-40 flex-col items-center"}>
                        <Image src="/images/team/Syntra-Media-Emir-Ayaz-Kurucu-Ortak.jpg" alt="Syntra Media Kurucu Ortağı Emir Ayaz"  width="512" height="512" className={"w-40 h-40 rounded-full bg-white"} />
                            <p className={"text-lg mt-3"}>Emir Ayaz</p>
                            <p className={"text-light/70 mt-2"}>
                                {selectedLocale.aboutus.co_founder}
                            </p>
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
                            {selectedLocale.aboutus.image_caption}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;