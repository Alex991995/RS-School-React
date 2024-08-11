import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { expect, describe, it } from '@jest/globals';
import CardList from '../components/CardList';
import { renderWithProviders } from '@/utils/test-utils';

import { setupStore } from '@/features/store';
import { addData, saveProduct } from '@/features/slices/productSlice';
import { arrayMockProduct, mockProduct } from '@/utils/mock/mockdata';

import { act } from 'react';

describe('CardList component', () => {
  it('Render listItems from redux store', async () => {
    const store = setupStore();
    await act(async () => {
      store.dispatch(addData(arrayMockProduct));
      store.dispatch(saveProduct({ ...mockProduct, checked: true }));
    });

    renderWithProviders(
      <CardList />,

      { store },
    );

    const productItems = await screen.findAllByRole('listitem');
    expect(productItems).toHaveLength(arrayMockProduct.length);
  });
});
