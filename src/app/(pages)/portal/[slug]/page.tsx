import React from 'react';
import { notFound } from 'next/navigation';
import Profile from '@/components/ui/Portal/Profile';
import Projects from '@/components/ui/Portal/Projects';
import Files from '@/components/ui/Portal/Files';
import Notifications from '@/components/ui/Portal/Notifications';
import Invoices from '@/components/ui/Portal/Invoices';

const ROUTES = [
  {
      name: "Projeler",
      href: "/portal/project",
      component: ( <Projects /> ),
  },
  {
      name: "Görevler",
      href: "/portal/tasks",
      component: ( <div>görevler</div> ),
  },
  {
      name: "İletişim Merkezi",
      href: "/portal/contact",
      component: ( <Notifications /> ),
  },
  {
      name: "Ödemeler",
      href: "/portal/payments",
      component: ( <Invoices /> ),
  },
  {
      name: "Dosyalar",
      href: "/portal/files",
      component: ( <Files /> ),
  },
  {
      name: "Analiz ve İstatistik",
      href: "/portal/analysis",
      component: ( <div>analız</div> ),
  },
  {
    name: "Ayarlar",
    href: "/portal/settings",
    component: ( <div>ayarlar</div> ),
  },
  {
    name: "Profil",
    href: "/portal/profile",
    component: ( <Profile /> ),
  }
]

const Page = async (props: { params: Promise<{ slug: string }> }) => {
    const params = await props.params;
    const activeRoute = ROUTES.find(route => route.href === `/portal/${params.slug}`);

    if (!activeRoute) {
        notFound();
    }

    return activeRoute.component;
};

export default Page;

// Add this new function for generating static params
export async function generateStaticParams() {
    return ROUTES.map(route => ({
        slug: route.href.split('/').pop(),
    }));
}