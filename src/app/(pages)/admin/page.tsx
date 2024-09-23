"use client";

import React, {useEffect} from 'react';
import { useAdmin } from '@/components/providers/AdminProvider';
import Link from 'next/link';
import {NotebookPen, Presentation, SquareUser } from 'lucide-react';

const AdminPanel = () => {
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
        <div className={"w-full flex h-screen overflow-hidden text-light"}>
            <div className={"flex flex-col gap-12 w-full h-full mx-24 mt-24"}>
                <div className={"flex flex-col gap-4"}>
                    <h1 className={"font-medium text-5xl"}>
                        Welcome, <span className={"text-primary-100"}>{user?.firstName}.</span>
                    </h1>
                    <p className={"text-light/90"}>
                        This is the admin panel. Here you can manage your website content
                    </p>
                </div>
                <div className={"flex gap-12"}>
                    <Link className={"flex flex-col gap-4 items-center justify-center w-80 h-48 border rounded-lg border-light/30 hover:bg-neutral-800/30 transition-all"} href={"/admin/meetings"}>
                        <Presentation size={48}/>
                        <p className={"text-light/90"}>
                            Meetings
                        </p>
                    </Link>
                    <Link className={"flex flex-col gap-4 items-center justify-center w-80 h-48 border rounded-lg border-light/30 hover:bg-neutral-800/30 transition-all"} href={"/admin/blog"}>
                        <NotebookPen size={48}/>
                        <p className={"text-light/90"}>
                            Blog
                        </p>
                    </Link>
                    <Link className={"flex flex-col gap-4 items-center justify-center w-80 h-48 border rounded-lg border-light/30 hover:bg-neutral-800/30 transition-all"} href={"/admin/portal"}>
                        <SquareUser size={48}/>
                        <p className={"text-light/90"}>
                            Portal
                        </p>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default AdminPanel;