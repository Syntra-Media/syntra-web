"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PhaseCard from "@/components/ui/PhaseCard";
import {useUser} from "@clerk/nextjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { usePortal } from '@/components/providers/PortalProvider';
import { Oval } from 'react-loader-spinner';
import FastLinks from '@/components/ui/FastLinksCard';
import TasksOverviewCard from '@/components/ui/TasksOverviewCard';
import SyntraDriveCard from '@/components/ui/SyntraDriveCard';
import NotificationsCard from '@/components/ui/NotificationsCard';
import InvoiceCard from '@/components/ui/InvoiceCard';
import TasksCard from '@/components/ui/TasksCard';

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
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-screen items-center justify-center flex lg:hidden"
        >
          <p className='text-2xl font-medium'>
            Mobile version coming soon...
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={"w-full h-screen overflow-hidden hidden lg:flex"}
        >
            <div className={"flex flex-col gap-4 w-full mx-16 my-16"}>
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={"flex justify-between items-center w-full"}
                >
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
                </motion.div>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full h-full gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-4 lg:grid-cols-8 auto-rows-fr overflow-hidden grid"
                >
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "tween", duration: 0.3 }}
                      className="col-span-1 md:col-span-2 overflow-hidden"
                    >
                        <PhaseCard phase={selectedProject.phases[0]}/>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "tween", duration: 0.3 }}
                      className="col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden"
                    >
                        <FastLinks />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "tween", duration: 0.3 }}
                      className="col-span-1 md:col-span-4 lg:col-span-3 md:row-span-2"
                    >
                      <TasksCard tasks={selectedProject.tasks} />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "tween", duration: 0.3 }}
                      className="col-span-1 md:col-span-2 overflow-hidden"
                    >
                        <TasksOverviewCard tasks={selectedProject.tasks} />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "tween", duration: 0.3 }}
                      className="col-span-1 md:col-span-2 lg:col-span-3"
                    >
                      <NotificationsCard notifications={selectedProject.notifications} />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "tween", duration: 0.3 }}
                      className="col-span-1 md:col-span-4 lg:col-span-5 md:row-span-2 "
                    >
                      <SyntraDriveCard files={selectedProject.files} />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "tween", duration: 0.3 }}
                      className="col-span-1 md:col-span-4 lg:col-span-3 md:row-span-2 "
                    >
                      <InvoiceCard invoices={selectedProject.payments} project={{
                        payment_info: selectedProject.payment_info,
                        name: selectedProject.name
                      }}/>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
      </>
    );
};

export default Portal;