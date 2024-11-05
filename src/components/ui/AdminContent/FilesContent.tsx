"use client";

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@clerk/nextjs';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TrashIcon } from 'lucide-react';
import { createFunc, deleteFunc } from '@/utils/supabaseRequests';
import toast from 'react-hot-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';

const schema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  type: z.enum(["table", "video", "document", "image"], {
    errorMap: () => ({ message: "Type must be table, video, document or image" })
  }),
  link: z.string().min(1, {message: "Link is required"}),
  size: z.number().min(1, {message: "Size is required"}),
  pinned: z.boolean().default(false).optional(),
});

function FilesContent({ files, projectId }: { files: any, projectId: string }) {
  const [projectFiles, setProjectFiles] = useState(files);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();

  const {register, handleSubmit, formState: {errors}, reset, setValue, watch} = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      pinned: false
    }
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      const token = await getToken({template: "supabase"});
      const res = await createFunc({token, type: "files", insertData: {
        name: data.name,
        type: data.type,
        link: data.link,
        size: data.size,
        pinned: data.pinned,
        project: projectId,
      }});
      
      if (res) {
        setProjectFiles((prev: any) => [...prev, {
          id: prev.length + 1,
          name: data.name,
          type: data.type,
          link: data.link,
          size: data.size,
          project: projectId,
          pinned: data.pinned,
        }]);
        toast.success("File added successfully");
        reset();
        setOpen(false);
      } else {
        toast.error("Failed to add file");
      }
    } catch (error) {
      toast.error("An error occurred while adding the file");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const token = await getToken({template: "supabase"})
    const res = await deleteFunc({token, type: "files", id: id});
    if (res) {
      toast.success("File deleted successfully");
      setProjectFiles(projectFiles.filter((file: any) => file.id !== id));
    }
  }

  return (
    <div className='flex flex-col gap-2 w-full h-full rounded-lg'>
      <Table className='rounded-lg h-full w-full'>
        <TableHeader>
          <TableRow className='hover:bg-transparent border-b-transparent'>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Pinned</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectFiles.map((file: any) => (
            <TableRow key={file.id} className='border-b-slate-200/20 hover:bg-slate-200/20'>
              <TableCell>{file.name}</TableCell>
              <TableCell>{file.type}</TableCell>
              <TableCell>
                <a href={file.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {file.link}
                </a>
              </TableCell>
              <TableCell>{file.size}MB</TableCell>
              <TableCell>{file.pinned ? 'Yes' : 'No'}</TableCell>
              <TableCell className='text-right'>
                <Button variant='ghost' size='icon' className='bg-red-500/10 hover:bg-red-500/20' onClick={() => handleDelete(file.id)}>
                  <TrashIcon className='w-4 h-4 text-red-500' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-end mt-auto'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant='outline'>Add File</Button>
          </DialogTrigger>
          <DialogContent className='dark w-full'>
            <DialogHeader>
              <DialogTitle>Add File</DialogTitle>
              <DialogDescription>
                Add a new file to the project.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-1">
                  <Input {...register("name")} placeholder="Name" />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Select onValueChange={(value) => setValue("type", value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="table">Table</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input {...register("link")} placeholder="Link" />
                  {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input {...register("size", {valueAsNumber: true})} placeholder="Size (MB)" type="number" />
                  {errors.size && <p className="text-red-500 text-sm">{errors.size.message}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    className='border-slate-200/20' 
                    id="pinned"
                    checked={watch("pinned")}
                    onCheckedChange={(checked) => setValue("pinned", !!checked)}
                  />
                  <label htmlFor="pinned">Pin this file</label>
                </div>
              </div>
              <DialogFooter>
                <Button variant={"secondary"} type="submit" disabled={loading}>Add</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default FilesContent
