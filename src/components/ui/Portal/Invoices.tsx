"use client";

import React from 'react'
import { usePortal } from '@/components/providers/PortalProvider';
import { Oval } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import { DownloadIcon } from 'lucide-react';
import { Button } from '../Button';
import { cn } from '@/lib/utils';

function Invoices() {
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
    );
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
          Faturalar
        </motion.h1>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='flex flex-col w-full gap-4'
        >
          {favoriteProject?.payments && favoriteProject?.payments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProject.payments.map((payment: any, index: number) => (
                <motion.div
                  key={payment.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className='bg-slate-800/50 rounded-xl shadow-lg overflow-hidden'
                >
                  <div className='p-6 flex flex-col h-full'>
                    <div className='flex justify-between items-start mb-4'>
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 * index + 0.5 }}
                        className={cn(
                          "text-xs font-semibold text-primary/70 bg-primary/10 px-2 py-1 rounded-full",
                          payment.paid ? 'text-green-500 bg-green-500/20' : 'text-red-500 bg-red-500/20'
                        )}
                      >
                        {payment.paid ? 'Ödendi' : 'Bekliyor'}
                      </motion.span>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * index + 0.7 }}
                        className='text-xs text-light/50'
                      >
                        {new Date(payment.deadline).toLocaleDateString()}
                      </motion.p>
                    </div>
                    <motion.h2 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index + 0.9 }}
                      className='text-4xl font-bold text-primary mb-2'
                    >
                      {index + 1}. Fatura
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index + 1.1 }}
                      className='text-xs text-light/60 mb-4 line-clamp-2'
                    >
                      {payment.description}
                    </motion.p>
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index + 1.3 }}
                      className='mt-auto'
                    >
                      {!payment.paid ? (
                        <Button variant="default" size="sm" className='w-full rounded-lg'>
                          Ödeme Yap
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" className='w-full rounded-lg'>
                          <DownloadIcon className='w-4 h-4 mr-2' />
                          Fatura Dosyasını İndir
                        </Button>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl shadow-lg p-8'
            >
              <p className='text-gray-400 text-center text-lg'>Henüz fatura bulunmamaktadır.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Invoices