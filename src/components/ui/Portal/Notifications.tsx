"use client";

import React, { useMemo } from 'react'
import { usePortal } from '@/components/providers/PortalProvider'
import { Oval } from 'react-loader-spinner'
import { motion } from 'framer-motion'
import { Separator } from '../Separator';
import { Button } from '../Button';
import { ArrowRightIcon, EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/components/providers/PortalThemeProvider';
import { cn } from '@/lib/utils';

function Notifications() {
  const { favoriteProject, loading } = usePortal();
  const { isDarkTheme } = useTheme();

  if (loading) {
    return (
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
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'flex w-full overflow-y-auto',
        isDarkTheme ? 'bg-bg-200/20' : 'bg-gray-100'
      )}
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
                className={cn(
                  'rounded-lg shadow-md overflow-hidden p-4 transition-colors duration-200',
                  isDarkTheme 
                    ? 'bg-slate-800/50 hover:bg-slate-800/70' 
                    : 'bg-white hover:bg-gray-50'
                )}
              >
                <Link href={`/portal/notifications/${notification.id}`} className='flex justify-between h-full'>
                  <div className='flex flex-col gap-3'>
                    <h2 className={cn(
                      'text-xl font-semibold',
                      isDarkTheme ? 'text-light' : 'text-gray-800'
                    )}>
                      {notification.title}
                    </h2>
                    <div className='flex gap-3 items-center'>
                      <p className={cn(
                        'text-sm',
                        isDarkTheme ? 'text-light/70' : 'text-gray-600'
                      )}>
                        {notification.sender}
                      </p>
                      <Separator orientation='vertical' className={cn(
                        'h-4',
                        isDarkTheme ? 'bg-light/70' : 'bg-gray-400'
                      )} />
                      <p className={cn(
                        'text-sm',
                        isDarkTheme ? 'text-light/70' : 'text-gray-600'
                      )}>
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-3 h-full justify-center'>
                    <div className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-full',
                      isDarkTheme ? 'bg-light/10' : 'bg-gray-100'
                    )}>
                      <ArrowRightIcon className={cn(
                        'w-6 h-6',
                        isDarkTheme ? 'opacity-70' : 'text-gray-600'
                      )} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn(
                'rounded-xl shadow-lg p-8',
                isDarkTheme 
                  ? 'bg-gradient-to-br from-slate-800/50 to-slate-700/50' 
                  : 'bg-white'
              )}
            >
              <p className={cn(
                'text-center text-lg',
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              )}>
                Henüz bildirim bulunmamaktadır.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Notifications