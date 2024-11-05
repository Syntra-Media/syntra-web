import { ChevronRightIcon, MessageCircleIcon } from 'lucide-react';
import React, { useMemo } from 'react'
import Link from 'next/link';
import { useTheme } from '@/components/providers/PortalThemeProvider';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

function NotificationsCard({notifications}: {notifications: any[]}) {
  const { isDarkTheme } = useTheme();
  const lastNotification = useMemo(() => {
    return notifications[notifications.length - 1];
  }, [notifications]);
  
  if (notifications.length === 0) return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={cn(
        "flex w-full h-full rounded-lg backdrop-blur border transition-all duration-200 hover:shadow-lg",
        isDarkTheme ? "bg-bg-100/15 border-slate-700/60 hover:bg-bg-100/30" : "bg-gray-100 border-gray-200 hover:bg-gray-200/50"
      )}>
      <div className={"flex w-full h-full items-center justify-center"}>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={cn(
            'text-xs font-medium',
            isDarkTheme ? 'text-light/60' : 'text-gray-600'
          )}>
          Henüz bildirim yok
        </motion.p>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={cn(
        "flex w-full h-full rounded-lg backdrop-blur border transition-all duration-200 hover:shadow-lg",
        isDarkTheme ? "bg-bg-100/15 border-slate-700/60 hover:bg-bg-100/30" : "bg-gray-100 border-gray-200 hover:bg-gray-200/50"
      )}>
      <div className={"flex flex-col w-full h-full gap-2 p-3"}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='flex items-center gap-1'>
          <MessageCircleIcon className={cn(
            'w-6 h-6',
            isDarkTheme ? 'text-light/90' : 'text-gray-800'
          )} />
          <p className={cn(
            'text-base font-medium',
            isDarkTheme ? 'text-light/90' : 'text-gray-800'
          )}>
            {lastNotification.title}
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={cn(
            'text-sm font-medium line-clamp-3 prose prose-xs',
            isDarkTheme ? 'text-light/80 prose-invert' : 'text-gray-700'
          )} dangerouslySetInnerHTML={{__html: lastNotification.content}}></motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='flex w-full mt-auto items-end justify-between'>
          <p className={cn(
            'text-xs font-medium',
            isDarkTheme ? 'text-light/60' : 'text-gray-600'
          )}>
            {lastNotification.sender} tarafından gönderildi
          </p>
          <Link href={`/portal/notifications/${lastNotification.id}`} 
            className={cn(
              'text-xs font-medium transition-colors duration-200',
              isDarkTheme ? 'text-light/60 hover:text-light' : 'text-gray-600 hover:text-gray-900'
            )}>
            mesajı oku
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default NotificationsCard