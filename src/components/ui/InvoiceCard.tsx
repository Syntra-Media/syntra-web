"use client";

import React, { useEffect, useState } from 'react'
import { usePortal } from '../providers/PortalProvider';
import { Oval } from 'react-loader-spinner';
import { Button } from './Button';
import { CheckCircleIcon } from 'lucide-react';

function InvoiceCard() {
  const { favoriteProject, loading } = usePortal();
  const [currentInvoice, setCurrentInvoice] = useState<any>(null);

  useEffect(() => {
    if (favoriteProject) {
      favoriteProject.payments.forEach((payment: any, index: number) => {
        if (payment.paid === false) {
          setCurrentInvoice({...payment, id: index + 1, deadline: new Date(payment.deadline)});
        }
      });
    }
  }, [favoriteProject]);
  
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
      <div className='flex bg-bg-200/20 flex-col w-full h-full items-center justify-center gap-4'>
        <CheckCircleIcon className='w-16 h-16 text-green-500' />
        <p className='text-lg font-medium text-light/90'>
          Tüm faturalarınız ödenmiştir.
        </p>
      </div>
    );
  }

  return (
    <div className='flex w-full h-full bg-bg-200/20 rounded-lg'>
      <div className='flex flex-col w-full h-full gap-2 p-3'>
        <div className='flex items-center justify-between w-full'>
          <p className='text-xl font-bold text-light/90'>
            {favoriteProject?.name} Projesi
          </p>
          <p className='text-lg font-medium text-primary/90'>
            {currentInvoice?.id}. Ödeme / {favoriteProject?.payment_info}
          </p>
        </div>
        <p className='text-base font-medium text-light/70'>
          {currentInvoice?.description}
        </p>
        <div className='flex flex-col justify-end h-full'>
          <p className='text-2xl font-medium text-primary/90'>
            {currentInvoice?.fee} TL
          </p>
          <p className='text-xs text-light/50'>
            {favoriteProject?.payment_info} aylık ücretin her aya dağılmış şeklinde geldiği aylık ücret miktarı.
          </p>
        </div>
        <div className='flex flex-col w-full mt-auto gap-3'>
          <p className='text-sm p-2 bg-red-500/30 rounded-lg font-medium text-light/80'>
            {currentInvoice?.deadline.toLocaleDateString()} tarihine kadar ödeme yapılmalıdır.
          </p>
          <Button>
            Ödeme Yap
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InvoiceCard