'use client';
import useActions from '@/hooks/useActions';
import { Product } from '@/types/fetchTypes';
import React from 'react';

interface DataReceiverComponentProps {
  data: Product[];
}

function DataReceiverComponent({ data }: DataReceiverComponentProps) {
  const { addData } = useActions();
  addData(data);
  return <></>;
}

export default DataReceiverComponent;
