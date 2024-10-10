"use client";

import React, { useEffect, useState } from 'react';
import PortalSideBar from "@/components/ui/PortalSideBar";
import {useRouter} from "next/navigation";
import PhaseCard from "@/components/ui/PhaseCard";
import {useUser} from "@clerk/nextjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { usePortal } from '@/components/providers/PortalProvider';
import { SelectLabel } from '@radix-ui/react-select';
import { Oval } from 'react-loader-spinner';

const Portal = () => {
    const {user, isLoaded} = useUser();
    const {projects, loading} = usePortal();
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const handleProjectChange = (projectId: string) => {
      user?.update({
        unsafeMetadata: {
          favorite: projectId
        }
      })
      setSelectedProject(projects.find((project: any) => project.id === projectId));
    };

    useEffect(() => {
      if (projects.length > 0 && !loading && isLoaded) {        
        const favoriteProject = projects.find((project: any) => project.id === user?.unsafeMetadata.favorite);
        if (favoriteProject) {
          setSelectedProject(favoriteProject);
        } else {
          setSelectedProject(projects[0]);
        }
      }
    }, [loading, isLoaded]);

    if (loading) return (
      <div className={"flex w-full h-screen items-center justify-center"}>
        <Oval
          height={64}
          width={64}
          color="#ffc300"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#ffc400"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );

    if (projects.length === 0) return <div>No projects found</div>;

    if (!selectedProject) return <div>No project selected</div>;

    return (
        <div className={"flex w-full h-screen"}>
            <div className={"flex flex-col gap-4 w-full mx-16 my-16"}>
                <div className={"flex justify-between items-center w-full"}>
                    <div className='flex flex-col gap-2'>
                        <h1 className={"font-medium text-5xl"}>
                            Hoş geldin, <span className={"text-primary-100"}>{user?.firstName}.</span>
                        </h1>
                        <p className={""}>
                            Sizlere daha iyi hizmet sunabilmek için ihtiyaç duyduğunuz tüm araçlara bu portal üzerinden kolayca ulaşabilirsiniz.
                        </p>
                    </div>
                    <div className='flex flex-col gap-2 dark'>
                      <Select onValueChange={handleProjectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder={"Varsayılan Proje"} />
                        </SelectTrigger>
                        <SelectContent className='dark'>
                          {projects.map((project: any) => (
                            <SelectItem key={project.id} value={project.id} className='dark' 
                            >
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                </div>
                <div className={"w-full h-full grid grid-cols-8 grid-rows-4 gap-8"}>
                    <div className="col-span-2">
                        <PhaseCard phase={selectedProject.phases[0]}/>
                    </div>
                    <div className="col-span-3 col-start-3 bg-bg-100/70 rounded-lg">2</div>
                    <div className="col-span-3 col-start-6 bg-bg-100/70 rounded-lg">3</div>
                    <div className="col-span-2 row-start-2 bg-bg-100/70 rounded-lg">4</div>
                    <div className="col-span-3 col-start-3 row-start-2 bg-bg-100/70 rounded-lg">5</div>
                    <div className="col-span-3 col-start-6 row-start-2 bg-bg-100/70 rounded-lg">6</div>
                    <div className="col-span-5 row-span-2 row-start-3 bg-bg-100/70 rounded-lg">7</div>
                    <div className="col-span-3 row-span-2 col-start-6 row-start-3 bg-bg-100/70 rounded-lg">8</div>
                </div>
            </div>
        </div>
    );
};

export default Portal;