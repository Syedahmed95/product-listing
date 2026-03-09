import type { Product } from '@/types';

const BASE_URL = 'https://dummyjson.com';

export const getProducts = async (): Promise<{ products: Product[] }> => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
