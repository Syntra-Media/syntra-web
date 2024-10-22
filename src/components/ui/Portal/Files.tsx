"use client"

import { usePortal } from '@/components/providers/PortalProvider';
import React from 'react'
import { Oval } from 'react-loader-spinner';
import { Separator } from '../Separator';
import Link from 'next/link';
import File from '@/components/ui/File';
import { motion, HTMLMotionProps } from 'framer-motion';

function Files() {
  const { loading, favoriteProject } = usePortal()

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex w-full overflow-y-auto'
    >
      <div className='flex flex-col gap-4 mx-6 lg:mx-16 my-16 w-full'>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-4xl font-bold text-primary'
        >
          Dosyalar
        </motion.h1>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='flex w-full'
        >
          <div className="flex w-full rounded-lg overflow-hidden">
            <div className="flex w-full overflow-hidden">
              <div className='flex flex-col gap-2 w-full mt-2 overflow-hidden'>
                <motion.div 
                  initial={{  opacity: 0 }}
                  animate={{  opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className='grid grid-cols-5 gap-x-4 gap-y-12 w-full mx-auto'
                >
                  {favoriteProject?.files
                    .sort((a: any, b: any) => (b.pinned ? 1 : -1) - (a.pinned ? 1 : -1))
                    .map((file: any, index: number) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <File projectFile={file} />
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className='flex w-full mt-8 gap-2'
                >
                  <p className='text-xs text-light/70'>
                    {favoriteProject?.files.length} dosya
                  </p>
                  <Separator className='bg-light/70' orientation='vertical'/>
                  <p className='text-xs text-light/70'>
                    {favoriteProject?.files.filter((file: any) => file.pinned).length} sabitlenmiş dosya
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Files