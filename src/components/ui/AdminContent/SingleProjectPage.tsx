'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { getProject, deleteFunc } from '@/utils/supabaseRequests';
import { Button } from '@/components/ui/Button';
import { ChevronLeftIcon, CreditCardIcon, PlusIcon, TrashIcon, CalendarCheckIcon, PenIcon, FileIcon, BellIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import TasksContent from '@/components/ui/AdminContent/TasksContent';
import PhaseContent from '@/components/ui/AdminContent/PhaseContent';
import PaymentsContent from '@/components/ui/AdminContent/PaymentsContent';
import FilesContent from '@/components/ui/AdminContent/FilesContent';
import NotificationsContent from '@/components/ui/AdminContent/NotificationsContent';

interface ProjectData {
  id: string;
  name: string;
  created_at: string;
  phases: any[];
  tasks: any[];
  payments: any[];
  files: any[];
  notifications: any[];
  [key: string]: string | any[];
}

const TABS = [
  { name: 'Tasks', icon: (<CalendarCheckIcon className="w-4 h-4" />), content: (project: any) => <TasksContent tasks={project.tasks} projectId={project.id} /> },
  { name: 'Phases', icon: (<PlusIcon className="w-4 h-4" />), content: (project: any) => <PhaseContent projectPhases={project.phases} projectId={project.id} /> },
  { name: 'Payments', icon: (<CreditCardIcon className="w-4 h-4" />), content: (project: any) => <PaymentsContent payments={project.payments} projectId={project.id} /> },
  { name: 'Files', icon: (<FileIcon className="w-4 h-4" />), content: (project: any) => <FilesContent files={project.files} projectId={project.id} /> },
  { name: 'Notifications', icon: (<BellIcon className="w-4 h-4" />), content: (project: any) => <NotificationsContent notifications={project.notifications} files={project.files} projectId={project.id} /> }, 
];

export default function ProjectPage({project}: {project: ProjectData}) {
  const { getToken } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('Tasks');
  const [projectState, setProjectState] = useState<ProjectData | null>(project);

  const handleDelete = async (id: string, type: string) => {
    const token = await getToken({ template: 'supabase' });

    const data = await deleteFunc({token, id, type});
    if (data) {
      setProjectState(prev => prev ? {
        ...prev,
        [type]: Array.isArray(prev[type]) ? prev[type].filter((item: any) => item.id !== id) : prev[type]
      } : null);
      toast.success(`${type} deleted successfully`);
    };
  }

  const handleEdit = (id: string, type: string) => {
    console.log(id, type);
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
  }

  return (
    <div className="flex flex-col gap-6 p-16 w-full h-screen overflow-hidden">
      <div className="flex justify-between items-center">
        <div className='flex gap-2 items-center'>
          <Link href="/admin/portal" className="text-light/70 hover:text-light transition-colors duration-200">
            <ChevronLeftIcon className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold">{project.name}</h1>
        </div>
        <div className="flex gap-2 items-center text-light/70">
          <Button variant="ghost" size="icon" className='bg-slate-500 transition-colors duration-200' onClick={() => handleEdit(project.id, 'projects')}>
            <PenIcon className='w-4 h-4 text-light' />
          </Button>
          <Button variant="ghost" size="icon" className='bg-red-500 hover:bg-red-600 transition-colors duration-200' onClick={() => handleDelete(project.id, 'projects')}>
            <TrashIcon className="w-4 h-4 text-light" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 w-full h-full">
      {/* sidebar */}
        <div className='flex flex-col gap-1 w-64 h-full p-4 rounded-lg bg-bg-100/15 border border-slate-700/60'>
          {TABS.map((tab) => (
            <a key={tab.name} className={`cursor-pointer flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-bg-100/30 transition-colors duration-200 ${activeTab === tab.name ? 'bg-bg-100/50' : ''}`} onClick={() => setActiveTab(tab.name)}>
              {tab.icon}
              {tab.name}
            </a>
          ))}
        </div>

        {/* content */}
        <div className='flex flex-col gap-2 w-full h-full p-4 rounded-lg bg-bg-100/15 border border-slate-700/60'>
          {
            TABS.find(tab => tab.name === activeTab)?.content?.(project)
          }
        </div>
      </div>

    </div>
  );
}
