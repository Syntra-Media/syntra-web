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
import { useTheme } from '@/components/providers/PortalThemeProvider'

function Profile() {
  const { projects, loading, favoriteProject } = usePortal()
  const { user, isLoaded } = useUser()
  const { isDarkTheme } = useTheme()

  if (loading || !isLoaded) return (
    <div className={cn(
      'flex w-full h-screen items-center justify-center',
      isDarkTheme ? 'bg-bg-200/20' : 'bg-gray-100'
    )}>
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
        className={cn(
          'flex w-full h-full',
          isDarkTheme ? 'bg-bg-200/20' : 'bg-gray-100'
        )}
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
                <h2 className={cn(
                  'text-4xl',
                  isDarkTheme ? 'text-light' : 'text-gray-800'
                )}>{user?.fullName}</h2>
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
                    baseTheme: isDarkTheme ? dark : undefined,
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
            <h2 className={cn(
              'text-2xl font-medium',
              isDarkTheme ? 'text-light/90' : 'text-gray-800'
            )}>Aktif Projeler</h2>
            <div className='flex flex-wrap w-full gap-4'>
              {
                loading ? <Skeleton className='w-full h-16 rounded-md' /> :
                projects.map((project: any, index: number) => (
                  <motion.div 
                    key={project.id} 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className={cn(
                      'flex items-center gap-4 px-4 py-3 rounded-md cursor-pointer transition-colors duration-200',
                      isDarkTheme 
                        ? 'bg-light/10 hover:bg-light/20' 
                        : 'bg-white hover:bg-gray-50',
                      favoriteProject?.id === project.id && (
                        isDarkTheme 
                          ? 'bg-yellow-500/20 hover:bg-yellow-500/30'
                          : 'bg-yellow-300/20 hover:bg-yellow-300/30'
                      )
                    )}
                  >
                    <FolderRootIcon className={cn(
                      'w-12 h-12',
                      isDarkTheme ? 'opacity-70' : 'text-gray-600'
                    )} />
                    <div className='flex flex-col gap-1'>
                      <p className={cn(
                        'text-lg font-medium flex items-center gap-2',
                        isDarkTheme ? 'text-light' : 'text-gray-800'
                      )}>
                        {project.name}
                        {
                          favoriteProject?.id === project.id && (
                            <Star className='w-4 h-4 opacity-70 text-primary' />
                          )
                        }
                      </p>
                      <p className={cn(
                        'text-xs',
                        isDarkTheme ? 'text-light/50' : 'text-gray-500'
                      )}>
                        {new Date(project.created_at).toLocaleDateString()} tarihinde oluşturuldu
                      </p>
                    </div>
                    <Link href={`/portal/project/`} className={cn(
                      'flex items-center justify-center w-6 h-6 rounded-full',
                      isDarkTheme ? 'bg-light/10' : 'bg-gray-100'
                    )}>
                      <ArrowRightIcon className={cn(
                        'w-4 h-4',
                        isDarkTheme ? 'opacity-70' : 'text-gray-600'
                      )} />
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