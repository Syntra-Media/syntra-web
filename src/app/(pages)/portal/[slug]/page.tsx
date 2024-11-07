import Files from "@/components/ui/Portal/Files";
import Invoices from "@/components/ui/Portal/Invoices";
import Notifications from "@/components/ui/Portal/Notifications";
import Profile from "@/components/ui/Portal/Profile";
import Projects from "@/components/ui/Portal/Projects";
import Settings from "@/components/ui/Portal/Settings";
import Tasks from "@/components/ui/Portal/Tasks";
import { notFound } from "next/navigation";
import React from "react";

const ROUTES = {
  project: {
    name: "Projeler", 
    href: "project",
    component: Projects,
  },
  tasks: {
    name: "Görevler",
    href: "tasks", 
    component: Tasks,
  },
  contact: {
    name: "İletişim Merkezi",
    href: "contact",
    component: Notifications,
  },
  payments: {
    name: "Ödemeler",
    href: "payments",
    component: Invoices,
  },
  files: {
    name: "Dosyalar",
    href: "files",
    component: Files,
  },
  settings: {
    name: "Ayarlar",
    href: "settings",
    component: Settings,
  },
  profile: {
    name: "Profil",
    href: "profile",
    component: Profile,
  },
}

async function PortalSlug({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const slug = (await params).slug;

  const route = ROUTES[slug as keyof typeof ROUTES];

  if (!route) {
    notFound();
  }

  const Component = route.component

  return (
    <Component />
  )
}

export default PortalSlug

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return [
    { slug: 'project' },
    { slug: 'tasks' },
    { slug: 'contact' },
    { slug: 'payments' },
    { slug: 'files' },
    { slug: 'settings' },
    { slug: 'profile' },
  ];
}