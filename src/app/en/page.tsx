"use client"

import React, { useEffect } from 'react';
import {useRouter} from "next/navigation";
import {usePathname} from "next/navigation"
import Header from "@/components/ui/Header";
import LandingHero from "@/components/ui/LandingHero";
import LogoSection from "@/components/ui/sections/LogoSection";
import AboutUsSection from "@/components/ui/sections/AboutUsSection";
import ServicesSection from "@/components/ui/sections/ServicesSection";
import Footer from "@/components/ui/Footer";
import FaqSection from "@/components/ui/sections/FaqSection";
import TestimonialsSection from "@/components/ui/sections/TestimonialsSection";
import CTASection from "@/components/ui/sections/CTASection";


const Home = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [locale, setLocale] = React.useState<"en" | "tr">(pathname === "/" ? "tr" : "en");

    return (
        <div className={"flex flex-col w-full overflow-x-hidden"}>
            <Header locale={locale}/>
            <LandingHero locale={locale}/>
            <LogoSection/>
            <ServicesSection locale={locale}/>
            <AboutUsSection locale={locale}/>
            <TestimonialsSection locale={locale}/>
            <FaqSection locale={locale}/>
            <CTASection locale={locale}/>
            <Footer locale={locale}/>
        </div>
    );
};

export default Home;
