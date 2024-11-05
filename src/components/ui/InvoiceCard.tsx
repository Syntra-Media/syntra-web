"use client";

import React, { useEffect, useState } from 'react'
import { usePortal } from '../providers/PortalProvider';
import { Oval } from 'react-loader-spinner';
import { Button } from './Button';
import { CheckCircleIcon } from 'lucide-react';
import { useTheme } from '@/components/providers/PortalThemeProvider';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

function InvoiceCard({invoices, project}: {invoices: any[], project: any}) {
  const { loading } = usePortal();
  const { isDarkTheme } = useTheme();
  const [currentInvoice, setCurrentInvoice] = useState<any>(null);

  useEffect(() => {
    if (invoices) {
      invoices.forEach((payment: any, index: number) => {
        if (payment.paid === false) {
          setCurrentInvoice({...payment, id: index + 1, deadline: new Date(payment.deadline)});
        }
      });
    }
  }, [invoices]);
  
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

  if (!currentInvoice) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={cn(
          'flex flex-col w-full h-full items-center justify-center gap-4 rounded-lg backdrop-blur border transition-all duration-200 hover:shadow-lg',
          isDarkTheme ? 'bg-bg-100/15 border-slate-700/60 hover:bg-bg-100/30' : 'bg-gray-100 border-gray-200 hover:bg-gray-200/50'
        )}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}>
          <CheckCircleIcon className='w-16 h-16 text-green-500' />
        </motion.div>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={cn(
            'text-lg font-medium',
            isDarkTheme ? 'text-light/90' : 'text-gray-800'
          )}>
          Tüm faturalarınız ödenmiştir.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={cn(
        'flex w-full h-full rounded-lg backdrop-blur border transition-all duration-200 hover:shadow-lg',
        isDarkTheme ? 'bg-bg-100/15 border-slate-700/60 hover:bg-bg-100/30' : 'bg-gray-100 border-gray-200 hover:bg-gray-200/50'
      )}>
      <div className='flex flex-col w-full h-full gap-2 p-3'>
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='flex items-center justify-between w-full'>
          <p className={cn(
            'text-xl font-bold',
            isDarkTheme ? 'text-light/90' : 'text-gray-800'
          )}>
            {project.name} Projesi
          </p>
          <p className='text-lg font-medium text-primary/90'>
            {currentInvoice?.id}. Ödeme / {project.payment_info}
          </p>
        </motion.div>
        <motion.p 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={cn(
            'text-base font-medium',
            isDarkTheme ? 'text-light/70' : 'text-gray-600'
          )}>
          {currentInvoice?.description}
        </motion.p>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className='flex flex-col justify-end h-full'>
          <p className='text-2xl font-medium text-primary/90'>
            {currentInvoice?.fee} TL
          </p>
          <p className={cn(
            'text-xs',
            isDarkTheme ? 'text-light/50' : 'text-gray-500'
          )}>
            {project.payment_info} aylık ücretin her aya dağılmış şeklinde geldiği aylık ücret miktarı.
          </p>
        </motion.div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='flex flex-col w-full mt-auto gap-3'>
          <p className={cn(
            'text-sm p-2 rounded-lg font-medium',
            isDarkTheme ? 'bg-red-500/30 text-light/80' : 'bg-red-100 text-red-800'
          )}>
            {currentInvoice?.deadline.toLocaleDateString()} tarihine kadar ödeme yapılmalıdır.
          </p>
          <motion.div whileHover={{ x: 2 }}>
            <Button>
              Ödeme Yap
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default InvoiceCard