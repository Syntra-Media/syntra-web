"use client";

import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import { useAdmin } from '@/components/providers/AdminProvider';

const AdminPanel = () => {
    const router = useRouter();
    const {user, isLoaded} = useAdmin();

    if (!isLoaded) {
        return (
            <div className={"w-full h-screen flex justify-center items-center"}>
                <p className={"text-2xl font-medium"}>
                    Loading...
                </p>
            </div>
        )
    }

    return (
        <div className={"w-full flex h-screen overflow-hidden"}>
            <div className={"flex flex-col gap-12 w-full h-full mx-24 mt-24"}>
                <h1 className={"font-medium text-5xl"}>
                    Welcome, <span className={"text-primary-100"}>{user?.firstName}.</span>
                </h1>
                <div className={"w-full h-full flex gap-24"}>
                    <div className={"hover:bg-neutral-800/20 transition-all w-full h-full mb-24 flex flex-col border border-light/10 rounded-lg justify-center items-center"} onClick={() => router.push("/admin/blog")}>
                        <p className={"text-6xl"}>
                            Blog
                        </p>
                    </div>
                    <div
                        className={"hover:bg-neutral-800/20 transition-all w-full h-full mb-24 flex flex-col border border-light/10 rounded-lg justify-center items-center"} onClick={() => router.push("/admin/portal")}>
                        <p className={"text-6xl"}>
                            Client Portal
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;