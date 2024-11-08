import SingleProjectPage from '@/components/ui/AdminContent/SingleProjectPage';
import { getProject } from '@/utils/supabaseServerActions';

export default async function Page({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return <SingleProjectPage project={project} />;
}
