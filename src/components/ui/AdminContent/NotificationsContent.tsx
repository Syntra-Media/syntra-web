"use client";

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileIcon, TrashIcon } from 'lucide-react';
import { createFunc, deleteFunc } from '@/utils/supabaseRequests';
import toast from 'react-hot-toast';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

const schema = z.object({
  title: z.string().min(1, {message: "Title is required"}),
  content: z.string().min(1, {message: "Content is required"}),
  attachments: z.array(z.number()).optional(),
});

function NotificationsContent({ notifications, files, projectId }: { notifications: any, files: any, projectId: string }) {
  const [projectNotifications, setProjectNotifications] = useState(notifications);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const { getToken } = useAuth();
  const { user } = useUser();
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setValue('content', editor.getHTML());
    }
  })

  const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      content: '',
    }
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      const token = await getToken({template: "supabase"});
      const res = await createFunc({token, type: "notifications", insertData: {
        title: data.title,
        content: data.content,
        project: projectId,
        attachments: selectedFiles,
        sender: user?.fullName
      }});
      
      if (res) {
        setProjectNotifications((prev: any) => [...prev, {
          id: prev.length + 1,
          title: data.title,
          content: data.content,
          project: projectId,
          created_at: new Date().toISOString(),
          attachments: selectedFiles
        }]);
        toast.success("Notification created successfully");
        editor?.commands.setContent('');
        setSelectedFiles([]);
        reset();
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to create notification");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const token = await getToken({template: "supabase"})
    const res = await deleteFunc({token, type: "notifications", id: id});
    if (res) {
      toast.success("Notification deleted successfully");
      setProjectNotifications(projectNotifications.filter((notification: any) => notification.id !== id));
    }
  }

  const handleFileSelect = (fileId: number) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      }
      return [...prev, fileId];
    });
  };

  return (
    <div className='flex flex-col gap-2 w-full h-full rounded-lg'>
      <Table className='rounded-lg h-full w-full'>
        <TableHeader>
          <TableRow className='hover:bg-transparent border-b-transparent'>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Attachments</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectNotifications.map((notification: any) => (
            <TableRow key={notification.id} className='border-b-slate-200/20 hover:bg-slate-200/20'>
              <TableCell>{notification.title}</TableCell>
              <TableCell>
                <div dangerouslySetInnerHTML={{ __html: notification.content }} className='truncate line-clamp-2' />
              </TableCell>
              <TableCell>{new Date(notification.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                {notification.attachments?.length || 0} files
              </TableCell>
              <TableCell className='text-right'>
                <Button variant='ghost' size='icon' className='bg-red-500/10 hover:bg-red-500/20' onClick={() => handleDelete(notification.id)}>
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
            <Button variant='outline'>Add Notification</Button>
          </DialogTrigger>
          <DialogContent className='dark w-full'>
            <DialogHeader>
              <DialogTitle>Create Notification</DialogTitle>
              <DialogDescription>
                Create a new notification for the project.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-1">
                  <Input {...register("title")} placeholder="Title" />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <EditorContent editor={editor} className="border rounded-md p-2" />
                  {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <Select onValueChange={(value: string) => handleFileSelect(parseInt(value))}>
                    <SelectTrigger className='dark'>
                      <SelectValue placeholder="Select attachments" />
                    </SelectTrigger>
                    <SelectContent className='max-h-[200px] overflow-y-auto dark'>
                      {files.map((file: any) => (
                        <SelectItem key={file.id} value={file.id.toString()}>
                          <div className='flex items-center gap-2'>
                            <FileIcon className='w-4 h-4' />
                            <p className='text-sm'>{file.name}</p>
                            <p className='text-xs text-slate-500'>{file.type} | {file.size}mb</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="secondary" 
                  type="submit" 
                  disabled={loading || !editor?.getText()}>
                  {loading ? 'Creating...' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default NotificationsContent
