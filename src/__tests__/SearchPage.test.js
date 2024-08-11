import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import SearchPage from '@/pages/index';
import { expect, describe, it, jest, beforeEach } from '@jest/globals';
import { arrayMockProduct } from '@/utils/mock/mockdata';
import { renderWithProviders } from '@/utils/test-utils';
import { act } from 'react';
import { addData } from '@/features/slices/productSlice';
import setupStore from '@/features/store';

describe('SearchPage component', () => {
  it('render  SearchPage', async () => {
    const store = setupStore();
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const { container } = renderWithProviders(<SearchPage data={arrayMockProduct} />);

    await act(async () => {
      store.dispatch(addData(arrayMockProduct));
    });

    expect(container).toBeInTheDocument();
    expect(dispatchSpy).toHaveBeenCalledWith(addData(arrayMockProduct));
  });
});
