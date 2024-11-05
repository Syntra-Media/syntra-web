"use client";

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@clerk/nextjs';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFunc, updateFunc } from '@/utils/supabaseRequests';
import toast from 'react-hot-toast';
import { CheckIcon } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  fee: z.string().min(1, {message: "Amount is required"}),
  description: z.string().min(1, {message: "Description is required"}),
  deadline: z.string().transform((val) => new Date(val).toLocaleDateString()),
});

function PaymentsContent({ payments, projectId }: { payments: any, projectId: string }) {
  const [projectPayments, setProjectPayments] = useState(payments);
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
      const res = await createFunc({token, type: "payments", insertData: {
        name: data.name,
        fee: data.fee,
        description: data.description,
        deadline: data.deadline,
        project: projectId,
      }});
      
      if (res) {
        setProjectPayments([...projectPayments, {
          id: projectPayments.length + 1,
          name: data.name,
          fee: data.fee,
          description: data.description,
          deadline: data.deadline,
        }]);
        toast.success("Payment created successfully");
        reset();
        setLoading(false)
        setOpen(false)
      }
    }
    AddToDB();
  }

  const handlePayment = async (paymentId: string) => {
    setLoading(true)
    const token = await getToken({template: "supabase"})
    const res = await updateFunc({token, type: "payments", id: paymentId, updateData: {
      paid: true,
    }})

    if (res) {
      toast.success("Payment marked as paid");
      setProjectPayments(projectPayments.map((payment: any) => payment.id === paymentId ? {...payment, paid: true} : payment))
    }

    setLoading(false)
  }

  return (
    <div className='flex flex-col gap-2 w-full h-full rounded-lg'>
      <Table className='rounded-lg h-full w-full'>
        <TableHeader>
          <TableRow className='hover:bg-transparent border-b-transparent'>
            <TableHead>Amount</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectPayments.map((payment: any) => (
            <TableRow key={payment.id} className='border-b-slate-200/20 hover:bg-slate-200/20'>
              <TableCell>{payment.name}</TableCell>
              <TableCell>{payment.fee}₺</TableCell>
              <TableCell>{payment.description}</TableCell>
              <TableCell>{new Date(payment.deadline).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className={`px-2 py-1 rounded-md inline-block
                  ${payment.paid ? 'bg-green-500/20 text-green-500' :
                    'bg-red-500/20 text-red-500'}`}>
                  {payment.paid ? 'Paid' : 'Pending'}
                </div>
              </TableCell>
              {
                !payment.paid && (
                  <TableCell>
                    <Button variant={"ghost"} size={"icon"} className='bg-green-500/20 text-green-500' onClick={() => handlePayment(payment.id)} disabled={loading}><CheckIcon className='w-4 h-4' /></Button>
                  </TableCell>
                )
              }
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className='dark'>
          <TableRow>
            <TableCell colSpan={5} className='text-right bg-transparent'>
              <p className='text-sm text-slate-500'>Total: {projectPayments.reduce((acc: number, curr: any) => acc + curr.fee, 0)}₺</p>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className='flex justify-end mt-auto'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant='outline'>Add Payment</Button>
          </DialogTrigger>
          <DialogContent className='dark w-full'>
            <DialogHeader>
              <DialogTitle>Create Payment</DialogTitle>
              <DialogDescription>
                Create a new payment for the project.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-1">
                  <Input {...register("name")} placeholder="Name" />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input {...register("fee")} placeholder="Amount" type="number" />
                  {errors.fee && <p className="text-red-500 text-sm">{errors.fee.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input {...register("description")} placeholder="Description" />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input {...register("deadline")} placeholder="Due Date" type="date" />
                  {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline.message}</p>}
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

export default PaymentsContent
