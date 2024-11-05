"use client";

import { getPortalInfo } from '@/utils/supabaseRequests';
import { useAuth, useUser } from '@clerk/nextjs';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const PortalContext = createContext<any | undefined>(undefined);

interface PortalProviderProps {
    children: ReactNode;
}

export const PortalProvider = ({ children }: PortalProviderProps) => {
  const {user, isLoaded} = useUser();
  const {getToken} = useAuth();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any>([]);
  const [favoriteProject, setFavoriteProject] = useState<any>(null);
  useEffect(() => {
    if (!isLoaded) return;
    const id = user?.id;

    const GetData = async (id: string | undefined) => {
        if (!id) return;
        const token = await getToken({template: "supabase"});
        const projects = await getPortalInfo({token,id});
        setProjects(projects);
        if (Array.isArray(projects)) {
            setFavoriteProject(projects.find((project: any) => project.id === user?.unsafeMetadata?.favorite));
        }
        setLoading(false);
    }

    GetData(id);

  }, [isLoaded, user?.unsafeMetadata]);
  
  return (
        <PortalContext.Provider value={{projects, loading, favoriteProject}}>
            {children}
        </PortalContext.Provider>
  );
}

export const usePortal = () => {
    const context = useContext(PortalContext);
    if (!context) {
        throw new Error("usePortal must be used within a PortalProvider");
    }
    return context;
}