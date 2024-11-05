"use client";

import React, {useMemo} from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import {usePathname} from "next/navigation";
import {CalendarCheck, Home, Mail, PanelsTopLeft, WalletCards, File, AreaChart, Settings} from "lucide-react";
import Link from "next/link";
import {cn} from "@/utils/cn";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './Avatar';
import { useTheme } from '@/components/providers/PortalThemeProvider';

type PortalSideBarProps = {
    children: React.ReactNode
}

const PortalSideBar = ({children}: PortalSideBarProps) => {
    const {user} = useUser();
    const pathname = usePathname();
    const { isDarkTheme } = useTheme();
    
    const routes = useMemo(() => [
        {
            name: "Portal",
            href: "/portal",
            active: pathname === "/portal",
            icon: ( <Home/> )
        },
        {
            name: "Projeler",
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
            name: "Dosyalar",
            href: "/portal/files",
            active: pathname === "/portal/files",
            icon: ( <File /> )
        },
    ], [pathname]);

    return (
        <div className={cn("flex w-full h-screen overflow-hidden", 
          isDarkTheme ? "text-light" : "text-gray-800"
        )}>
            <div className={cn("w-20 h-screen hidden md:flex", 
              isDarkTheme ? "bg-bg-100/15 " : "bg-white border-r border-gray-200"
            )}>
                <div className={"w-full h-full flex flex-col mx-4 my-8 items-center gap-8"}>
                    <svg width="18" height="38" viewBox="0 0 18 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 18.1485L6.13333 5.99242L11.6 3.08182L18 0L9.32727 18.1485H18L11.4667 32.5303L6.13333 34.9273L0 37.6667L9.32727 18.1485H0Z"
                            stroke={"#FFC300"}
                        />
                    </svg>
                      <TooltipProvider>
                        <div className={"flex flex-col gap-2 h-full mb-16"}>
                            {
                                routes.map((route, index) => (
                                    <div key={index}>
                                          <Tooltip>
                                              <TooltipTrigger>
                                                  <Link href={route.href} key={index}
                                                        className={cn("w-12 h-12 flex items-center justify-center", 
                                                          route.active && (isDarkTheme ? "rounded-lg bg-blue-300/20" : "rounded-lg bg-blue-100")
                                                        )}>
                                                      {route.icon}
                                                  </Link>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                  {route.name}
                                              </TooltipContent>
                                          </Tooltip>
                                    </div>
                                ))
                            }

                            {/* User profile and settings in the bottom */}
                            <div className={"flex flex-col gap-2 mt-auto"}>
                              {/* Settings */}
                              <div className={"flex flex-col gap-2 mt-auto"}>
                                  <Tooltip>
                                      <TooltipTrigger>
                                          <Link href={"/portal/settings"} className={"h-8 flex items-center justify-center w-full"}>
                                              <Settings size={20}/>
                                          </Link>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                          Ayarlar
                                      </TooltipContent>
                                  </Tooltip>
                              </div>

                              {/* User profile */}
                              <div className={"flex flex-col gap-2 mt-auto"}>
                                  <Tooltip>
                                      <TooltipTrigger>
                                        <Link href={"/portal/profile"} className={"w-12 h-12 flex items-center justify-center rounded-full"}>
                                          <Avatar>
                                            <AvatarImage src={user?.imageUrl} className='rounded-full'/>
                                          <AvatarFallback>
                                            {user?.fullName?.charAt(0)}
                                          </AvatarFallback>
                                        </Avatar>
                                      </Link>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Profil
                                      </TooltipContent>
                                  </Tooltip>
                              </div>
                            </div>
                        </div>
                      </TooltipProvider>
                </div>
            </div>
            {children}
        </div>
    );
};

export default PortalSideBar;