"use client";

import React, { useEffect, useState } from 'react'
import { usePortal } from '@/components/providers/PortalProvider';
import { CheckIcon, Star, XIcon } from 'lucide-react';
import { Button } from '../Button';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { Oval } from 'react-loader-spinner';

function Projects() {
  const {user, isLoaded} = useUser();
  const {projects, loading} = usePortal();
  const [favoriteProjectId, setFavoriteProjectId] = useState<any>(null);

  useEffect(() => {
    if (isLoaded && user) {
      const favoriteProject = user?.unsafeMetadata?.favorite;
      setFavoriteProjectId(favoriteProject);
    }
  }, [isLoaded, user, projects]);

  const handleFavorite = (projectId: any) => {
    user?.update({
      unsafeMetadata: {
        favorite: projectId
      }
    });

    setFavoriteProjectId(projectId);
  }

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

  return (
    <div className='flex w-full'>
      <div className='flex flex-col gap-4 w-full h-full mx-16 my-16'>
        <h2 className='text-2xl font-bold'>
          Aktif Projeler
        </h2>
        <div className='flex flex-col gap-4 w-full h-full'>
          {
            projects.map((project: any) => (
              <div key={project.id} className='flex flex-col gap-2 px-4 py-3 rounded-md bg-light/10'>
                <div className='flex flex-row justify-between items-center'>
                  <div className='flex gap-4 items-center'>
                    <p className='text-lg font-medium'>
                      {project.name}
                    </p>
                    <div className='text-sm text-light/50'>
                      {
                        project.payments.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())[0].paid ? (
                          <div className='flex gap-2 items-center'>
                            <CheckIcon className='w-4 h-4 text-green-500' />
                            <p>
                              Son fatura ödenmiş
                            </p>
                          </div>
                        ) : (
                          <div className='flex gap-2 items-center'>
                            <XIcon className='w-4 h-4 text-red-500' />
                            <p>
                              Son fatura henüz ödenmedi
                            </p>
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <div className='flex gap-4 items-center'>
                    <p className='text-sm text-light/50 text-right'>
                      {
                        new Date(project.created_at).toLocaleDateString()
                      }
                      <br />
                      adlı tarihte oluşturuldu
                    </p>
                    <Button variant={"ghost"} size={"icon"} onClick={() => {
                      handleFavorite(project.id);
                    }}>
                      <Star className={cn(
                        "w-4 h-4",
                        favoriteProjectId === project.id ? "text-primary" : "text-light/50"
                      )} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>  
    </div>
  )
}

export default Projects