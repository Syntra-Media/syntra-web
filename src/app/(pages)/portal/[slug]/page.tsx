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
    component: Projects
  },
  tasks: {
    name: "Görevler",
    component: Tasks
  },
  contact: {
    name: "İletişim Merkezi", 
    component: Notifications
  },
  payments: {
    name: "Ödemeler",
    component: Invoices
  },
  files: {
    name: "Dosyalar",
    component: Files
  },
  settings: {
    name: "Ayarlar",
    component: Settings
  },
  profile: {
    name: "Profil",
    component: Profile
  }
} as const;

// Enable ISR
export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = true;

const Page = async ({ params }: { params: { slug: string } }) => {
  const route = ROUTES[params.slug as keyof typeof ROUTES];
  
  if (!route) {
    notFound();
  }

  const Component = route.component;
  return <Component />;
};

export default Page;

export async function generateStaticParams() {
  return Object.keys(ROUTES).map(slug => ({
    slug
  }));
}