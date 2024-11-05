"use client";

import React,{useRef, useState} from 'react'

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter} from '@/components/ui/Dialog';
import { useAuth } from '@clerk/nextjs';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { createFunc } from '@/utils/supabaseRequests';
import toast from 'react-hot-toast';

type Stage = {
  id: number; // auto increment
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

function PhaseForm({projectId}: {projectId: string}) {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(false)
  const stageInput = useRef<HTMLInputElement>(null);
  const {getToken} = useAuth();

  const {register, handleSubmit, formState: {errors}, setValue, reset} = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true)
    const AddToDB = async () => {
      const token = await getToken({template: "supabase"})
      const res = await createFunc({token,type: "phases", insertData: {
        name: data.name,
        description: data.description,
        end_at: data.end_at,
        project: projectId,
        stages: data.stages,
      }});
      
      if (res) {
        toast.success("Phase created successfully");
        setStages([])
        reset();
        setLoading(false)
        // refresh the page
        window.location.reload();
      }
    }
    AddToDB();
  }

  const handleAddStage = (name: string) => {
    setStages(prev => [...prev, {id: prev.length + 1, name: name}]);
    setValue("stages", stages);
  }

  return (
    <>
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
              {
                stages.map((stage) => (
                  <div key={stage.id} className="flex justify-between gap-1">
                    <p>{stage.name}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant={"secondary"} type="submit" disabled={loading}>Create</Button>
        </DialogFooter>
      </form>
    </>
  )
}

export default PhaseForm