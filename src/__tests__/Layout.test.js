import '@testing-library/jest-dom';
import Layout from '@/components/Layout';
import { expect, describe, it, jest } from '@jest/globals';
import { arrayMockProduct, mockProduct } from '@/utils/mock/mockdata';
import { renderWithProviders } from '@/utils/test-utils';
import { act } from 'react';
import setupStore from '@/features/store';
import { addData, saveProduct } from '@/features/slices/productSlice';
import CardList from '@/components/CardList';

describe('Layout component', () => {
  it('render  Layout', async () => {
    const store = setupStore();
    await act(async () => {
      store.dispatch(saveProduct({ ...mockProduct, checked: true }));
      store.dispatch(addData(arrayMockProduct));
    });

    const dataFromApi = store.getState().product.data;
    const { container } = renderWithProviders(
      <Layout>
        {typeof window !== 'undefined' && dataFromApi?.length !== 0 && (
          <CardList dataFromApi={dataFromApi} />
        )}
      </Layout>,
    );
    expect(container).toBeInTheDocument();
  });
});
