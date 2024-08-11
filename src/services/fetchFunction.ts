import { Product } from '@/types/fetchTypes';
import { baseUrl } from '@/utils/constants';

export async function getData(title: string, page: string): Promise<Product[]> {
  const res = await fetch(`${baseUrl}/?limit=10&offset=${page}&title=${title}`);
  const data = (await res.json()) as Product[];
  return data;
}

export async function getSingleProduct(id: string): Promise<Product> {
  const response = await fetch(`${baseUrl}/${id}`);
  const product = (await response.json()) as Product;
  return product;
}
