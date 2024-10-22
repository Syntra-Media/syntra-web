import { CalendarCheck, CircleUser, CreditCard, File, FileText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function FastLinks() {
  return (
    <div className={"flex w-full h-full bg-bg-200/20 rounded-lg overflow-x-auto"}>
          <div className={"flex items-center justify-between 2xl:gap-6 gap-4 w-full mx-4 2xl:mx-8 my-2"}>
            <Link href={"/portal/profile"} className='flex flex-col items-center gap-2 text-light/90'>
              <CircleUser className='2xl:w-12 2xl:h-12 w-8 h-8' />
              <span className='text-sm 2xl:text-base'>Profil</span>
            </Link>
            <Link href={"/portal/project"} className='flex flex-col items-center gap-2 text-light/90'>
              <FileText className='2xl:w-12 2xl:h-12 w-8 h-8' />
              <span className='text-sm 2xl:text-base'>Projeler</span>
            </Link>
            <Link href={"/portal/tasks"} className='flex flex-col items-center gap-2 text-light/90'>
              <CalendarCheck className='2xl:w-12 2xl:h-12 w-8 h-8' />
              <span className='text-sm 2xl:text-base'>Görevler</span>
            </Link>
            <Link href={"/portal/payments"} className='flex flex-col items-center gap-2 text-light/90'>
              <CreditCard className='2xl:w-12 2xl:h-12 w-8 h-8' />
              <span className='text-sm 2xl:text-base'>Ödemeler</span>
            </Link>
            <Link href={"/portal/files"} className='flex flex-col items-center gap-2 text-light/90'>
              <File className='2xl:w-12 2xl:h-12 w-8 h-8' />
              <span className='text-sm 2xl:text-base'>Dosyalar</span>
            </Link>
          </div>
    </div>
  )
}

export default FastLinks