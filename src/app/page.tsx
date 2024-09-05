"use client"

import React, { useEffect } from 'react';
import {useRouter} from "next/navigation";
import Header from "@/components/ui/Header";
import LandingHero from "@/components/ui/LandingHero";
import LogoSection from "@/components/ui/sections/LogoSection";
import AboutUsSection from "@/components/ui/sections/AboutUsSection";
import ServicesSection from "@/components/ui/sections/ServicesSection";
import Footer from "@/components/ui/Footer";
import FaqSection from "@/components/ui/sections/FaqSection";
import TestimonialsSection from "@/components/ui/sections/TestimonialsSection";

const Home = () => {
  const router = useRouter();

    useEffect(() => {
        let date = new Date();
        let openingDate = new Date('2024-09-01');

        if ((date < openingDate) && (process.env.NODE_ENV === 'production')) {
            router.push('/coming-soon');
        }
    }, [router]);

  return (
        <div className={"flex flex-col w-full overflow-x-hidden"}>
          <Header/>
          <LandingHero />
          <LogoSection/>
          <ServicesSection/>
          <AboutUsSection/>
          <TestimonialsSection/>
          <FaqSection/>
          <Footer/>
        </div>
    );
};

export default Home;
