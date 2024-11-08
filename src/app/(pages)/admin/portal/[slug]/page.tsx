import SingleProjectPage from '@/components/ui/AdminContent/SingleProjectPage';
import { getProject } from '@/utils/supabaseServerActions';

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const project = await getProject(params.slug);

    if (!project) {
      return (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-xl">Project not found</h1>
        </div>
      );
    }

    return (
      <div className='w-full h-full flex'>
        <SingleProjectPage project={project} />
      </div>
    );
  } catch (error) {
    console.error('Error loading project:', error);
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-xl">Error loading project. Please try again later.</h1>
      </div>
    );
  }
}
