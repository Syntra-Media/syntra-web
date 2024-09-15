"use client";

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AdminContext = createContext<any | undefined>(undefined);

interface AdminProviderProps {
    children: ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
    const {user, isLoaded, isSignedIn} = useUser();
    const router = useRouter()

    useEffect(() => {
        if (!isLoaded) return;

        const admin = user?.publicMetadata.admin;

        if (!admin) {
            router.push('/');
        }
    }, [isLoaded, user]);

    return (
        <AdminContext.Provider value={{ user, isLoaded }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);

    if (context === undefined) {
        throw new Error('useAdmin must be used within a AdminProvider');
    }

    return context;
};