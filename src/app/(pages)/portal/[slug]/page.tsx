import React, { ReactElement } from 'react';
import { notFound } from 'next/navigation';
import Profile from '@/components/ui/Portal/Profile';
import Projects from '@/components/ui/Portal/Projects';

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
      component: ( <div>iletisim</div> ),
  },
  {
      name: "Ödemeler",
      href: "/portal/payments",
      component: ( <div>odemeler</div> ),
  },
  {
      name: "Dökümanlar",
      href: "/portal/documents",
      component: ( <div>dokumanlar</div> ),
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

const Page = ({ params }: { params: { slug: string } }) => {
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