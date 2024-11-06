import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import components with loading fallback
const Profile = dynamic(() => import('@/components/ui/Portal/Profile'), {
  loading: () => <div>Loading...</div>
});
const Projects = dynamic(() => import('@/components/ui/Portal/Projects'), {
  loading: () => <div>Loading...</div>
});
const Files = dynamic(() => import('@/components/ui/Portal/Files'), {
  loading: () => <div>Loading...</div>
});
const Notifications = dynamic(() => import('@/components/ui/Portal/Notifications'), {
  loading: () => <div>Loading...</div>
});
const Invoices = dynamic(() => import('@/components/ui/Portal/Invoices'), {
  loading: () => <div>Loading...</div>
});
const Tasks = dynamic(() => import('@/components/ui/Portal/Tasks'), {
  loading: () => <div>Loading...</div>
});
const Settings = dynamic(() => import('@/components/ui/Portal/Settings'), {
  loading: () => <div>Loading...</div>
});

// Define routes with path segments for easier matching
const ROUTES = {
  project: {
    name: "Projeler",
    component: Projects,
  },
  tasks: {
    name: "Görevler",
    component: Tasks, 
  },
  contact: {
    name: "İletişim Merkezi",
    component: Notifications,
  },
  payments: {
    name: "Ödemeler", 
    component: Invoices,
  },
  files: {
    name: "Dosyalar",
    component: Files,
  },
  settings: {
    name: "Ayarlar",
    component: Settings,
  },
  profile: {
    name: "Profil",
    component: Profile,
  }
} as const;

// Update generateStaticParams to be more explicit
export async function generateStaticParams() {
  return [
    { slug: 'project' },
    { slug: 'tasks' },
    { slug: 'contact' },
    { slug: 'payments' },
    { slug: 'files' },
    { slug: 'settings' },
    { slug: 'profile' }
  ];
}

// Enable dynamic parameters
export const dynamicParams = true;

// Type for route params
type RouteParams = {
  params: {
    slug: keyof typeof ROUTES;
  };
};

const Page = async ({ params }: RouteParams) => {
  const route = ROUTES[params.slug];
  
  if (!route) {
    notFound();
  }

  const Component = route.component;
  return <Component />
};

export default Page;