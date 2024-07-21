"use client"

import React, { useEffect } from 'react';
import {useRouter} from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
      let date = new Date();
      let openingDate = new Date('2024-08-01');

      if ((date < openingDate) && (process.env.NEXT_PUBLIC_DEV_MODE == '0')) {
          router.push('/coming-soon');
      }
  }, []);


  return (
        <div>
          
        </div>
    );
};

export default Home;
