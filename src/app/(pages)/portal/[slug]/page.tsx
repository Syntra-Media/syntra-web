"use client"

import React from 'react';
import Files from '@/components/ui/Portal/Files';
import Profile from '@/components/ui/Portal/Profile';
import Tasks from '@/components/ui/Portal/Tasks';
import Notifications from '@/components/ui/Portal/Notifications';
import Settings from '@/components/ui/Portal/Settings';
import Invoices from '@/components/ui/Portal/Invoices';
import Projects from '@/components/ui/Portal/Projects';
import { useRouter } from 'next/navigation';

const ROUTES = {
  "portal": {
    component: Profile,
    name: "Portal"
  },
  "project": {
    component: Projects,
    name: "Projeler"
  },
  "tasks": {
    component: Tasks,
    name: "Görevler"
  },
  "contact": {
    component: Notifications,
    name: "İletişim Merkezi"
  },
  "payments": {
    component: Invoices,
    name: "Ödemeler"
  },
  "files": {
    component: Files,
    name: "Dosyalar"
  },
  "settings": {
    component: Settings,
    name: "Ayarlar"
  },
  "profile": {
    component: Profile,
    name: "Profil"
  }
}

export default function PortalSlugPage({ params }: { params: { slug: string } }) {
  const route = ROUTES[params.slug as keyof typeof ROUTES];
  const router = useRouter();
  
  if (!route) {
    return router.push("/portal");
  }
  
  const Component = route.component;
  return <Component />
}