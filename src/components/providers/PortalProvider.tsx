"use client";

import { useUser } from '@clerk/nextjs';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const PortalContext = createContext<any | undefined>(undefined);

interface PortalProviderProps {
    children: ReactNode;
}

export const PortalProvider = ({ children }: PortalProviderProps) => {
  const {user, isLoaded} = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    const id = user?.id;

  }, [isLoaded, user]);
  
  return (
        <PortalContext.Provider value={{}}>
            {children}
        </PortalContext.Provider>
  );
}