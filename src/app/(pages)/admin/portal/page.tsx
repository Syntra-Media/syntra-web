'use client';

import { useAdmin } from '@/components/providers/AdminProvider';
import React, { useEffect, useState } from 'react'
import {useAuth} from '@clerk/nextjs';
import { getAllProjects } from '@/utils/supabaseRequests';
import Link from 'next/link';
import { ChevronRightIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';

function PortalAdmin() {
  const {getToken} = useAuth();

  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const GetData = async () => {
      const token = await getToken({template: 'supabase'});
      const data = await getAllProjects({token});
      if (data) setProjects(data);
    }
    GetData();
  }, []);


  return (
    <div className="flex flex-col gap-4 p-16 min-h-screen">
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold">Admin Portal</h1>
        <Button variant='outline'>
          <Link href='/admin/portal/new' className='flex items-center gap-2'>
            <PlusIcon className='w-4 h-4' />
            New Project
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Link href={`/admin/portal/${project.id}`} key={project.id}>
            <div className="bg-bg-100/20 transition-colors duration-200 rounded-xl p-6 flex justify-between gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium text-light tracking-tight">{project.name}</h2>
                <p className="text-light/70 text-sm line-clamp-2">{new Date(project.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <ChevronRightIcon className="w-12 h-12 text-light/40 bg-light/10 rounded-full p-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PortalAdmin
