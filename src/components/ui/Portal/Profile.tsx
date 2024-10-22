"use client"

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { UserProfile, useUser } from '@clerk/nextjs'
import { usePortal } from '@/components/providers/PortalProvider'
import { Skeleton } from '../Skeleton'
import { ArrowRightIcon, CheckIcon, FolderRootIcon, Pen, Star, XIcon } from 'lucide-react'
import Link from 'next/link'
import { Oval } from 'react-loader-spinner'
import { cn } from '@/lib/utils'
import {dark} from '@clerk/themes'
import { Dialog, DialogContent, DialogTrigger } from '../Dialog'
import { motion } from 'framer-motion'

function Profile() {
  const { projects, loading, favoriteProject } = usePortal()
  const { user, isLoaded } = useUser()

  if (loading || !isLoaded) return (
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
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='flex w-full h-full'
      >
        <div className='flex flex-col gap-4 mx-6 lg:mx-16 my-16 w-full h-full'>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-4xl font-bold text-primary'
          >
            Profil
          </motion.h1>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='flex w-full justify-between items-center mt-8'
          >
            <div className='flex gap-6 items-center'>
              <Avatar className='w-24 h-24'>
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  {user?.fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-0'>
                <h2 className='text-4xl'>{user?.fullName}</h2>
                <p className='text-sm text-gray-500 mt-1'>{user?.emailAddresses[0].emailAddress}</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button variant={'outline'} size={'icon'} className='rounded-full'>
                  <Pen className='w-4 h-4' />
                </Button>
              </DialogTrigger>
              <DialogContent className='w-full h-full flex items-center justify-center bg-transparent border-none border-transparent bg-none'>
                <UserProfile routing='virtual' appearance={
                  {
                    baseTheme: dark,
                    elements: {
                      card: "hidden"
                    }
                  }
                }/>
              </DialogContent>
            </Dialog>
          </motion.div>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='flex flex-col w-full gap-4 mt-8'
          >
            <h2 className='text-2xl font-medium text-light/90'>Aktif Projeler</h2>
            <div className='flex flex-wrap w-full gap-4'>
              {
                loading ? <Skeleton className='w-full h-16 rounded-md' /> :
                projects.map((project: any, index: number) => (
                  <motion.div 
                    key={project.id} 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className={cn('flex items-center gap-4 px-4 py-3 rounded-md bg-light/10 cursor-pointer transition-colors duration-200 hover:bg-light/20', {
                      'bg-yellow-500/20 hover:bg-yellow-500/30': favoriteProject?.id === project.id
                    })}
                  >
                    <FolderRootIcon className='w-12 h-12 opacity-70' />
                    <div className='flex flex-col gap-1'>
                      <p className='text-lg font-medium flex items-center gap-2'>
                        {project.name}
                        {
                          favoriteProject?.id === project.id && (
                            <Star className='w-4 h-4 opacity-70 text-primary' />
                          )
                        }
                      </p>
                      <p className='text-xs text-light/50'>
                        {new Date(project.created_at).toLocaleDateString()} tarihinde oluşturuldu
                      </p>
                    </div>
                    <Link href={`/portal/project/`} className='flex items-center justify-center w-6 h-6 rounded-full bg-light/10'>
                      <ArrowRightIcon className='w-4 h-4 opacity-70' />
                    </Link>
                  </motion.div>
                ))
              }
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}

export default Profile