"use client";

import React, { useState } from 'react'
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {toast} from 'react-hot-toast'
import { createFunc, createProject } from '@/utils/supabaseRequests';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const schema = z.object({
  name: z.string().min(1),
  user: z.string().min(1),
  payment_info: z.string(),
});

function NewProjectContent({ users }: { users: any[] }) {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const {getToken} = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);
    const token = await getToken({template: 'supabase'});
    if (!token) return;

    const res = await createProject({token, data: {
      name: data.name,
      owner: data.user,
      payment_info: data.payment_info,
    }});

    if (res) {
      toast.success('Project created successfully');
      reset();
      setValue('user', '');
    }
    setLoading(false);
  }
  
  return (
    <div className='flex flex-col gap-4 max-w-2xl'>
      <h1 className='text-2xl font-bold'>New Project</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Input placeholder='Project Name' {...register('name')} />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>
        <div className='flex flex-col gap-2'>
          <Select onValueChange={(value) => setValue('user', value)}>
            <SelectTrigger className='dark bg-neutral-950/10'>
              <SelectValue placeholder='Select Users' />
            </SelectTrigger>
            <SelectContent className='dark'>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  <div className='flex items-center gap-2'>
                    <Avatar className='w-6 h-6'>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <p>{user.firstName} {user.lastName}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.user && <p className='text-red-500'>{errors.user.message}</p>}
        </div>
        <div className='flex flex-col gap-2'>
          <Input type='number' placeholder='Payment Info' {...register('payment_info')} />
          {errors.payment_info && <p className='text-red-500'>{errors.payment_info.message}</p>}
        </div>
        <Button type='submit' disabled={loading}>{loading ? 'Creating...' : 'Create Project'}</Button>
      </form>
    </div>
  )
}

export default NewProjectContent