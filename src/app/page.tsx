import { getData } from '@/services/fetchFunction';
import DataReceiverComponent from '@/components/DataReceiverComponent';

interface HomeProps {
  searchParams: {
    title: string;
    page: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const title = searchParams.title || '';
  const page = searchParams.page || '1';
  const data = await getData(title, page);
  return <DataReceiverComponent data={data} />;
}
