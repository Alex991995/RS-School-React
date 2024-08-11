import '@testing-library/jest-dom';
import DataReceiverComponent from '../components/DataReceiverComponent';
import { expect, describe, it } from '@jest/globals';
import { arrayMockProduct } from '@/utils/mock/mockdata';
import { renderWithProviders } from '@/utils/test-utils';
import { setupStore } from '@/features/store';

describe('DataReceiverComponent', () => {
  it('DataReceiverComponent add to store data', () => {
    const store = setupStore();
    renderWithProviders(<DataReceiverComponent data={arrayMockProduct} />, { store });

    const state = store.getState();
    expect(state.product.data).toHaveLength(arrayMockProduct.length);
  });
});
