"use client";

import React, {useMemo} from 'react';
import {motion} from "framer-motion";
import {usePathname} from "next/navigation";
import {CalendarCheck, Home, Mail, PanelsTopLeft, WalletCards, File, AreaChart} from "lucide-react";
import Link from "next/link";
import {cn} from "@/utils/cn";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

type PortalSideBarProps = {
    children: React.ReactNode
}

const PortalSideBar = ({children}: PortalSideBarProps) => {
    const pathname = usePathname();
    const routes = useMemo(() => [
        {
            name: "Portal",
            href: "/portal",
            active: pathname === "/portal",
            icon: ( <Home/> )
        },
        {
            name: "Proje",
            href: "/portal/project",
            active: pathname === "/portal/project",
            icon: ( <PanelsTopLeft /> )
        },
        {
            name: "Görevler",
            href: "/portal/tasks",
            active: pathname === "/portal/tasks",
            icon: ( <CalendarCheck /> )
        },
        {
            name: "İletişim Merkezi",
            href: "/portal/contact",
            active: pathname === "/portal/contact",
            icon: ( <Mail /> )
        },
        {
            name: "Ödemeler",
            href: "/portal/payments",
            active: pathname === "/portal/payments",
            icon: ( <WalletCards /> )
        },
        {
            name: "Dökümanlar",
            href: "/portal/documents",
            active: pathname === "/portal/documents",
            icon: ( <File /> )
        },
        {
            name: "Analiz ve İstatistik",
            href: "/portal/analysis",
            active: pathname === "/portal/analysis",
            icon: ( <AreaChart /> )
        },
    ], [pathname]);

    return (
        <div className={"flex w-full h-screen bg-radial overflow-hidden text-light"}>
            <div className={"w-20 h-screen md:hidden sm:hidden bg-bg flex"}>
                <div className={"w-full h-full flex flex-col mx-4 my-8 items-center gap-8"}>
                    <svg width="18" height="38" viewBox="0 0 18 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 18.1485L6.13333 5.99242L11.6 3.08182L18 0L9.32727 18.1485H18L11.4667 32.5303L6.13333 34.9273L0 37.6667L9.32727 18.1485H0Z"
                            stroke={"#FFC300"}
                        />
                    </svg>
                    <div className={"flex flex-col gap-2"}>
                        {
                            routes.map((route, index) => (
                                <div key={index}>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Link href={route.href} key={index}
                                                  className={cn("w-12 h-12 flex items-center justify-center", route.active && "rounded-lg bg-blue-300/20")}>
                                                {route.icon}
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {route.name}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default PortalSideBar;