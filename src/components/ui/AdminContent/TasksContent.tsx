"use client";

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { TrashIcon, XIcon } from 'lucide-react';
import { CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@clerk/nextjs';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFunc, deleteFunc, updateFunc } from '@/utils/supabaseRequests';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  color: z.string().min(1, {message: "Color is required"}),
  end_date: z.string().transform((val) => new Date(val).toLocaleDateString()),
});

function TasksContent({ tasks, projectId }: { tasks: any, projectId: string }) {
  const [projectTasks, setProjectTasks] = useState(tasks);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();

  const {register, handleSubmit, formState: {errors}, reset} = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true)
    const AddToDB = async () => {
      const token = await getToken({template: "supabase"})
      const res = await createFunc({token, type: "tasks", insertData: {
        name: data.name,
        color: data.color,
        end_date: data.end_date,
        project: projectId,
      }});
      
      if (res) {
        setProjectTasks([...projectTasks, {
          id: projectTasks.length + 1,
          name: data.name,
          color: data.color,
          end_date: data.end_date,
        }]);
        toast.success("Task created successfully");
        reset();
        setLoading(false)
        setOpen(false)
      }
    }
    AddToDB();
  }

  const handleDelete = async (id: string) => {
    const token = await getToken({template: "supabase"})
    const res = await deleteFunc({token, type: "tasks", id: id});
    if (res) {
      toast.success("Task deleted successfully");
      setProjectTasks(projectTasks.filter((task: any) => task.id !== id));
    }
  }

  const handleUpdate = async (id: string, complete: boolean) => {
    const token = await getToken({template: "supabase"})
    const res = await updateFunc({token, type: "tasks", id: id, updateData: {
      complete: complete,
    }});

    if (res) {
      toast.success("Task updated successfully");
      setProjectTasks(projectTasks.map((task: any) => task.id === id ? {...task, complete: complete} : task));
    }
  }
  return (
    <div className='flex flex-col gap-2 w-full h-full rounded-lg'>
      <Table className='rounded-lg h-full w-full'>
        <TableHeader className=''>
          <TableRow className='hover:bg-transparent border-b-transparent'>
            <TableHead>Name</TableHead>
            <TableHead className=''>Color</TableHead>
            <TableHead className=''>Completed</TableHead>
            <TableHead className=''>Due Date</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=''>
          {
            projectTasks.map((task: any) => (
              <TableRow key={task.id} className='border-b-slate-200/20 hover:bg-slate-200/20'>
                <TableCell>{task.name}</TableCell>
                <TableCell className=''>
                  <div className={`w-3 h-3 rounded-full bg-${task.color}-500`}></div>
                </TableCell>
                <TableCell className=''>{task.complete ? ( <CheckIcon className='w-4 h-4 text-green-500' /> ) : ( <XIcon className='w-4 h-4 text-red-500' /> )}</TableCell>
                <TableCell className=''>{new Date(task.end_date).toLocaleDateString()}</TableCell>
                <TableCell className='space-x-2 flex justify-end'>
                  <Button variant='ghost' size='icon' className='bg-red-500/10 hover:bg-red-500/20' onClick={() => handleDelete(task.id)}>
                    <TrashIcon className='w-4 h-4 text-red-500' />
                  </Button>
                  {
                    !task.complete && (
                      <Button variant='ghost' size='icon' className='bg-green-500/10 hover:bg-green-500/20' onClick={() => handleUpdate(task.id, true)}>
                        <CheckIcon className='w-4 h-4 text-green-500' />
                      </Button>
                    )
                  }
                  {
                    task.complete && (
                      <Button variant='ghost' size='icon' className='bg-gray-500/10 hover:bg-gray-500/20' onClick={() => handleUpdate(task.id, false)}>
                        <XIcon className='w-4 h-4 text-gray-500' />
                      </Button>
                    )
                  }
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <div className='flex justify-end mt-auto'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant='outline'>Add Task</Button>
          </DialogTrigger>
          <DialogContent className='dark w-full'>
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
              <DialogDescription>
                Create a new task for the project.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-1">
                  <Input {...register("name")} placeholder="Name" />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input {...register("color")} placeholder="Color" />
                  {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input {...register("end_date")} placeholder="End Date" type="date" />
                  {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date.message}</p>}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" variant="secondary" disabled={loading}>Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default TasksContent