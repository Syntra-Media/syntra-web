"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/Separator';
import File from '@/components/ui/File';

interface NotificationProps {
  notification: {
    title: string;
    content: string;
    attachments: any[];
    sender: string;
    created_at: string;
  };
}

const SingleNotification: React.FC<NotificationProps> = ({ notification }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex w-full h-full bg-bg-200/20'
    >
      <div className='flex w-full h-full'>
        <div className='flex flex-col gap-4 mx-6 lg:mx-16 my-16 w-full h-full'>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-3xl font-medium text-primary'
          >
            {notification.title}
          </motion.h1>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='text-base mt-1 prose-lg prose prose-invert' 
            dangerouslySetInnerHTML={{ __html: notification.content }}
          />
          {notification.attachments.length > 0 && (
            <>
              <Separator className='my-2 bg-light/20' />
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className='flex flex-col gap-2'
              >
                <p className='text-base text-light/70'>
                  Eklentiler
                </p>
                <div className='flex gap-2'>
                  {notification.attachments.map((attachment: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    >
                      <File projectFile={attachment} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
          <Separator className='my-2 bg-light/20' />
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className='flex flex-col gap-2'
          >
            <p className='text-base text-light/70'>
              {notification.sender} tarafından {new Date(notification.created_at).toLocaleDateString()} tarihinde gönderildi
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleNotification;

