"use client";

import React, { useEffect, useState } from 'react'
import { usePortal } from '@/components/providers/PortalProvider';
import { CheckIcon, Star, XIcon, FolderIcon } from 'lucide-react';
import { Button } from '../Button';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { Oval } from 'react-loader-spinner';
import { motion } from 'framer-motion';

function Projects() {
  const { user, isLoaded } = useUser();
  const { projects, loading } = usePortal();
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
    <div className="flex w-full h-screen items-center justify-center">
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-7xl px-12 py-12'
    >
      <motion.h2 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-3xl font-bold mb-8'
      >
        Aktif Projeler
      </motion.h2>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      >
        {projects.map((project: any, index: number) => (
          <motion.div 
            key={project.id} 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className='bg-slate-800/50 rounded-lg shadow-md overflow-hidden'
          >
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center'>
                  <FolderIcon className='w-6 h-6 text-primary mr-2' />
                  <h3 className='text-xl font-semibold'>{project.name}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFavorite(project.id)}
                  className='hover:bg-transparent'
                >
                  <Star className={cn(
                    "w-5 h-5",
                    favoriteProjectId === project.id ? "text-yellow-400 fill-current" : "text-gray-400"
                  )} />
                </Button>
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-300 mb-4'>
                {project.payments.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())[0].paid ? (
                  <div className='flex items-center text-green-500'>
                    <CheckIcon className='w-4 h-4 mr-2' />
                    <p>Son fatura ödenmiş</p>
                  </div>
                ) : (
                  <div className='flex items-center text-red-500'>
                    <XIcon className='w-4 h-4 mr-2' />
                    <p>Son fatura henüz ödenmedi</p>
                  </div>
                )}
              </div>
              <div className='text-xs text-gray-500 dark:text-gray-400'>
                Oluşturulma tarihi: {new Date(project.created_at).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Projects