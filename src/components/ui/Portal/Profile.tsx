"use client"

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { useUser } from '@clerk/nextjs'
import { usePortal } from '@/components/providers/PortalProvider'
import { Skeleton } from '../Skeleton'
import { ArrowRightIcon, CheckIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { Oval } from 'react-loader-spinner'

function Profile() {
  const { projects, loading } = usePortal()
  const { user, isLoaded } = useUser()

  if (loading || !isLoaded) return (
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
  
  return (
    <div className='flex w-full h-full'>
      <div className='flex flex-col gap-4 mx-6 lg:mx-16 my-16 w-full h-full'>
        <h1 className='text-4xl font-bold text-primary'>Profil</h1>
        <div className='flex gap-6 items-center mt-8'>
          <Avatar className='w-24 h-24'>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.fullName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0'>
            <h2 className='text-4xl'>{user?.fullName}</h2>
            <p className='text-sm text-gray-500 mt-1'>{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
        <div className='flex flex-col w-full gap-4 mt-8'>
          <h2 className='text-2xl font-medium text-light/90'>Aktif Projeler</h2>
          <div className='flex flex-col w-full gap-4'>
            {
              loading ? <Skeleton className='w-full h-16 rounded-md' /> :
              projects.map((project: any) => (
                <div key={project.id} className='flex flex-col gap-2 px-4 py-3 rounded-md bg-light/10'>
                  <div className='flex flex-row justify-between items-center'>
                    <div className='flex gap-4 items-center'>
                      <p className='text-lg font-medium'>
                        {project.name}
                      </p>
                      <div className='text-sm text-light/50'>
                        {
                          project.payments.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())[0].paid ? (
                            <div className='flex gap-2 items-center'>
                              <CheckIcon className='w-4 h-4 text-green-500' />
                              <p>
                                Son fatura ödenmiş
                              </p>
                            </div>
                          ) : (
                            <div className='flex gap-2 items-center'>
                              <XIcon className='w-4 h-4 text-red-500' />
                              <p>
                                Son fatura henüz ödenmedi
                              </p>
                            </div>
                          )
                        }
                      </div>
                    </div>
                    <div className='flex gap-4 items-center'>
                      <p className='text-sm text-light/50 text-right'>
                        {
                          new Date(project.created_at).toLocaleDateString()
                        }
                        <br />
                        adlı tarihte oluşturuldu
                      </p>
                      <Button>
                        <Link href={`/portal/project/`}>
                          <ArrowRightIcon className='w-4 h-4' />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile