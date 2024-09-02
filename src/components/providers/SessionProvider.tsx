"use client";

import {SessionProvider} from "next-auth/react";
import React from 'react';

type SessionProviderProps = {
    children: React.ReactNode;
};


const NextAuthSessionProvider = ({children}: SessionProviderProps) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default NextAuthSessionProvider;