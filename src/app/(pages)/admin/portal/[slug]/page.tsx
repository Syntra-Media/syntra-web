import SingleProjectPage from '@/components/ui/AdminContent/SingleProjectPage';

export default function Page({ params }: { params: { slug: string } }) {
  return <SingleProjectPage slug={params.slug} />;
}
