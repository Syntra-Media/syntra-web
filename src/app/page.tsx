"use client"

import React, { useEffect } from 'react';
import {useRouter} from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEV_MODE == "0") {
      router.push("/coming-soon");
    }
  }, []);

  return (
        <div>
          test
        </div>
    );
};

export default Home;