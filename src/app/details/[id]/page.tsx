import { getSingleProduct } from '@/services/fetchFunction';
import dynamic from 'next/dynamic';
import React from 'react';
const SingleProduct = dynamic(() => import('@/components/SingleProduct'), { ssr: false });

async function DetailCardPage({ params }: { params: { id: string } }) {
  const singleProduct = await getSingleProduct(params.id);
  return <SingleProduct product={singleProduct} />;
}

export default DetailCardPage;
