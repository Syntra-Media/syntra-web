"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Separator } from '@/components/ui/Separator'
import { useUser } from '@clerk/nextjs'
import { useTheme } from '@/components/providers/PortalThemeProvider'
import { cn } from '@/lib/utils'

function Settings() {
  const { isDarkTheme } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkTheme: isDarkTheme,
  });

  const { user, isLoaded } = useUser();

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));

    if (isLoaded) {
      user?.update({
        unsafeMetadata: {
          ...user?.unsafeMetadata,
          settings: JSON.stringify({
            ...settings,
            [setting]: !settings[setting]
          })
        }
      })
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'flex w-full h-full overflow-y-auto',
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
          Ayarlar
        </motion.h1>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='flex flex-col w-full gap-8 pt-8 pb-16'
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className={cn(
              'text-2xl font-medium mb-6',
              isDarkTheme ? 'text-light/90' : 'text-gray-800'
            )}>Bildirim Ayarları</h2>
            <div className='flex flex-col gap-4'>
              <div className={cn(
                'flex items-center justify-between p-4 rounded-lg',
                isDarkTheme ? 'bg-light/5' : 'bg-white'
              )}>
                <div>
                  <p className={cn(
                    'font-medium',
                    isDarkTheme ? 'text-light/90' : 'text-gray-800'
                  )}>E-posta Bildirimleri</p>
                  <p className={cn(
                    'text-sm',
                    isDarkTheme ? 'text-light/50' : 'text-gray-500'
                  )}>Proje güncellemelerini e-posta ile al</p>
                </div>
                <Checkbox 
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleSettingChange('emailNotifications')}
                  className='w-6 h-6'
                />
              </div>
            </div>
          </motion.div>

          <Separator className={cn(
            'my-2 rounded-full',
            isDarkTheme ? 'bg-light/20' : 'bg-gray-200'
          )} />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className={cn(
              'text-2xl font-medium mb-6',
              isDarkTheme ? 'text-light/90' : 'text-gray-800'
            )}>Görünüm Ayarları</h2>
            <div className='flex flex-col gap-4'>
              <div className={cn(
                'flex items-center justify-between p-4 rounded-lg',
                isDarkTheme ? 'bg-light/5' : 'bg-white'
              )}>
                <div>
                  <p className={cn(
                    'font-medium',
                    isDarkTheme ? 'text-light/90' : 'text-gray-800'
                  )}>Koyu Tema</p>
                  <p className={cn(
                    'text-sm',
                    isDarkTheme ? 'text-light/50' : 'text-gray-500'
                  )}>Arayüz temasını değiştirin</p>
                </div>
                <Checkbox 
                  checked={settings.darkTheme}
                  onCheckedChange={() => handleSettingChange('darkTheme')}
                  className='w-6 h-6'
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Settings