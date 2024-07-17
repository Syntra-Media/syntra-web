"use client"

import React, { useEffect } from 'react';
import {useRouter} from "next/navigation";
import Header from "@/components/ui/Header";
import LandingHero from "@/components/ui/LandingHero";
import LogoSection from "@/components/ui/sections/LogoSection";
import AboutUsSection from "@/components/ui/sections/AboutUsSection";
import ServicesSection from "@/components/ui/sections/ServicesSection";
import Footer from "@/components/ui/Footer";

const Home = () => {
  const router = useRouter();

    useEffect(() => {
        let date = new Date();
        let openingDate = new Date('2024-07-18');

        if ((date < openingDate) && (process.env.NEXT_PUBLIC_DEV_MODE == '0')) {
            router.push('/coming-soon');
        }
    }, []);

  return (
        <div className={"flex flex-col w-full overflow-x-hidden"}>
          <Header />
          <LandingHero />
          <LogoSection/>
          <ServicesSection/>
          <AboutUsSection/>
          <Footer/>
        </div>
    );
};

export default Home;