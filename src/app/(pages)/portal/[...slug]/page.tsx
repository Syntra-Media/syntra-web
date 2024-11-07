'use client'

import Files from "@/components/ui/Portal/Files";
import Invoices from "@/components/ui/Portal/Invoices";
import Notifications from "@/components/ui/Portal/Notifications";
import Profile from "@/components/ui/Portal/Profile";
import Projects from "@/components/ui/Portal/Projects";
import Settings from "@/components/ui/Portal/Settings";
import Tasks from "@/components/ui/Portal/Tasks";
import { useParams, useRouter } from "next/navigation";

const ROUTES = {
  project: {
    name: "Projeler",
    href: "project", 
    component: Projects
  },
  tasks: {
    name: "Görevler",
    href: "tasks",
    component: Tasks
  },
  contact: {
    name: "İletişim Merkezi", 
    href: "contact",
    component: Notifications
  },
  payments: {
    name: "Ödemeler",
    href: "payments",
    component: Invoices
  },
  files: {
    name: "Dosyalar",
    href: "files",
    component: Files
  },
  settings: {
    name: "Ayarlar",
    href: "settings",
    component: Settings
  },
  profile: {
    name: "Profil",
    href: "profile",
    component: Profile
  }
} as const;

const PortalSlug = () => {
  const { slug } = useParams();
  const route = ROUTES[slug as keyof typeof ROUTES];
  const router = useRouter();

  if (!route) {
    router.push("/404");
  }

  return <route.component />;
};

export default PortalSlug;