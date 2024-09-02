"use client";

import React from 'react';
import {useSession} from "next-auth/react";
import PortalSideBar from "@/components/ui/PortalSideBar";
import {useRouter} from "next/navigation";
import PhaseCard from "@/components/ui/PhaseCard";

const Portal = () => {
    const router = useRouter();
    const {data: session} = useSession(
        {
            required: true,
            onUnauthenticated() {
                router.push("/api/auth/signin");
            }
        }
    );

    return (
        <div className={"flex w-full h-screen"}>
            <div className={"flex flex-col gap-4 w-full mx-16 my-16"}>
                <h1 className={"font-medium text-5xl"}>
                    Hoş geldin, <span className={"text-primary-100"}>{session?.user?.name}.</span>
                </h1>
                <p className={"text-xl"}>
                    Sizlere daha iyi hizmet sunabilmek için ihtiyaç duyduğunuz tüm araçlara bu portal üzerinden kolayca ulaşabilirsiniz.
                </p>
                <div className={"w-full h-full grid grid-cols-8 grid-rows-4 gap-8"}>
                    <div className="col-span-2 ">
                        <PhaseCard/>
                    </div>
                    <div className="col-span-3 col-start-3 ">2</div>
                    <div className="col-span-3 col-start-6 ">3</div>
                    <div className="col-span-2 row-start-2 ">4</div>
                    <div className="col-span-3 col-start-3 row-start-2 ">5</div>
                    <div className="col-span-3 col-start-6 row-start-2 ">6</div>
                    <div className="col-span-5 row-span-2 row-start-3 ">7</div>
                    <div className="col-span-3 row-span-2 col-start-6 row-start-3 ">8</div>
                </div>
            </div>
        </div>
    );
};

export default Portal;