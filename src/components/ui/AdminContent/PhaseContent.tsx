"use client";

import React, { useRef, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@clerk/nextjs';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { createFunc } from '@/utils/supabaseRequests';
import toast from 'react-hot-toast';

type Stage = {
  id: number;
  name: string;
}

const schema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  description: z.string().min(1, {message: "Description is required"}),
  stages: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
  end_at: z.string().transform((val) => new Date(val).toLocaleDateString()),
});

function PhaseContent({ projectPhases, projectId }: { projectPhases: any, projectId: string }) {
  const [phases, setPhases] = useState(projectPhases);
  const [open, setOpen] = useState(false);
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(false);
  const stageInput = useRef<HTMLInputElement>(null);
  const { getToken } = useAuth();

  const {register, handleSubmit, formState: {errors}, setValue, reset} = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true)
    const AddToDB = async () => {
      const token = await getToken({template: "supabase"})
      const res = await createFunc({token, type: "phases", insertData: {
        name: data.name,
        description: data.description,
        end_at: data.end_at,
        project: projectId,
        stages: data.stages,
      }});
      
      if (res) {
        setPhases((prev: any) => [...prev, {
          id: prev.length + 1,
          name: data.name,
          description: data.description,
          project: projectId,
          end_at: data.end_at,
          stages: data.stages,
        }]);
        toast.success("Phase created successfully");
        setStages([])
        reset();
        setLoading(false)
        setOpen(false);
      }
    }
    AddToDB();
  }

  const handleAddStage = (name: string) => {
    if (stageInput.current) {
      setStages(prev => [...prev, {id: prev.length + 1, name: name}]);
      setValue("stages", [...stages, {id: stages.length + 1, name: name}]);
      stageInput.current.value = '';
    }
  }

  return (
    <div className='flex flex-col gap-2 w-full h-full rounded-lg'>
      <Table className='rounded-lg h-full w-full'>
        <TableHeader>
          <TableRow className='hover:bg-transparent border-b-transparent'>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Stages</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {phases.map((phase: any) => (
            <TableRow key={phase.id} className='border-b-slate-200/20 hover:bg-slate-200/20'>
              <TableCell>{phase.name}</TableCell>
              <TableCell>{phase.description}</TableCell>
              <TableCell>{new Date(phase.end_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  {phase.stages.map((stage: any) => (
                    <div key={stage.id} className='px-2 py-1 rounded-md bg-slate-200/20'>
                      {stage.name}
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-end mt-auto'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant='outline'>Add Phase</Button>
          </DialogTrigger>
          <DialogContent className='dark w-full'>
            <DialogHeader>
              <DialogTitle>Create Phase</DialogTitle>
              <DialogDescription>
                Create a new phase for the project.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-1">
                  <Input {...register("name")} placeholder="Name" />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input {...register("description")} placeholder="Description" />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input {...register("end_at")} placeholder="End Date" type="date" />
                  {errors.end_at && <p className="text-red-500 text-sm">{errors.end_at.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <Input placeholder="Stage" ref={stageInput} />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      type="button"
                      onClick={() => stageInput.current?.value && handleAddStage(stageInput.current.value)}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className='flex flex-col gap-3 mt-4'>
                    {stages.map((stage) => (
                      <div key={stage.id} className="flex justify-between gap-1">
                        <p>{stage.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant={"secondary"} type="submit" disabled={loading}>Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default PhaseContent