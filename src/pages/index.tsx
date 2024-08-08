import { useEffect } from 'react';

import { useRestoreQueryParams } from '../hooks/useRestoreQueryParams';

import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { baseUrl } from '../utils/constants';
import { ArrayProducts, Product } from '../types/fetchTypes';
import { useAppDispatch } from '../hooks/reduxHooks';
import { addData } from '../features/slices/productSlice';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<ArrayProducts>> => {
  const { query } = context;

  const title = query.title || '';
  const page = query.page;

  const res = await fetch(`${baseUrl}?title=${title}&offset=${page}&limit=10`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

interface SearchPageProps {
  data: Product[];
}

function SearchPage({ data }: SearchPageProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [title] = useRestoreQueryParams('title');
  const [page] = useRestoreQueryParams('page');

  useEffect(() => {
    dispatch(addData(data));
  }, [data]);

  useEffect(() => {
    router.push(`/?title=${title}&page=${localStorage.getItem('page') || '1'}`);
  }, [title, page]);

  return <></>;
}

export default SearchPage;
