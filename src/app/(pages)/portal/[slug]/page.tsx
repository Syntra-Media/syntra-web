"use client"

import React, {ReactElement, useEffect, useState} from 'react';
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/Button";
import Link from "next/link";

const ROUTES = [
    {
        name: "Proje",
        href: "/portal/project",
        component: ( <div>proje</div> ),
    },
    {
        name: "Görevler",
        href: "/portal/tasks",
        component: ( <div>görevler</div> ),
    },
    {
        name: "İletişim Merkezi",
        href: "/portal/contact",
        component: ( <div>iletisim</div> ),
    },
    {
        name: "Ödemeler",
        href: "/portal/payments",
        component: ( <div>odemeler</div> ),
    },
    {
        name: "Dökümanlar",
        href: "/portal/documents",
        component: ( <div>dokumanlar</div> ),
    },
    {
        name: "Analiz ve İstatistik",
        href: "/portal/analysis",
        component: ( <div>analız</div> ),
    },
]

const Page = () => {
    const pathname = usePathname();
    const [activeRoute, setActiveRoute] = useState<{ name: string; href: string; component: ReactElement } | undefined>(undefined);

    useEffect(() => {
        ROUTES.map(route => {
            if (route.href === pathname) {
                setActiveRoute(route);
            }
        })
    }, [pathname]);

    return !activeRoute ? <div className={"w-full h-full flex flex-col gap-4 justify-center items-center"}>
        <h1 className={"text-7xl"}>
            404
        </h1>
        <p className={"text-2xl"}>
            Sayfa bulunamadı.
        </p>
        <Button>
            <Link href={"/portal"}>
                Portal&apos;a geri dön
            </Link>
        </Button>
    </div> : activeRoute.component;
};

export default Page;