"use client";

import React, { useMemo } from 'react'
import { usePortal } from '@/components/providers/PortalProvider'
import { Oval } from 'react-loader-spinner'
import { motion } from 'framer-motion'
import { Separator } from '../Separator';
import { Button } from '../Button';
import { ArrowRightIcon, EyeIcon } from 'lucide-react';
import Link from 'next/link';

function Notifications() {
  const { favoriteProject, loading } = usePortal();

  if (loading) {
    return (
      <div className='flex w-full h-screen items-center justify-center'>
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
    )
  }

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
          Bildirimler
        </motion.h1>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='flex flex-col w-full gap-4'
        >
          {favoriteProject?.notifications && favoriteProject?.notifications.length > 0 ? (
            favoriteProject?.notifications.map((notification: any, index: number) => (
              <motion.div
                key={notification.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className='bg-slate-800/50 hover:bg-slate-800/70 rounded-lg shadow-md overflow-hidden p-4 transition-colors duration-200'
              >
                <Link href={`/portal/notifications/${notification.id}`} className='flex justify-between h-full'>
                  <div className='flex flex-col gap-3'>
                    <h2 className='text-xl font-semibold'>{notification.title}</h2>
                    <div className='flex gap-3 items-center'>
                      <p className='text-sm text-light/70'>{notification.sender}</p>
                      <Separator orientation='vertical' className='h-4 text-light/70' />
                    <p className='text-sm text-light/70'>{new Date(notification.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-3 h-full justify-center'>
                      <div className='flex items-center justify-center w-12 h-12 rounded-full bg-light/10'>
                        <ArrowRightIcon className='w-6 h-6 opacity-70' />
                      </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className='text-gray-400'
            >
              Henüz bildirim bulunmamaktadır.
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Notifications