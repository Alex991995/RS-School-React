import Checkbox from '../components/Checkbox';
import productReducer, { initialState, saveProduct } from '../features/slices/productSlice';
import { mockProduct } from '../utils/mock/mockdata';
import { renderWithProviders } from '../utils/test-utils';

describe('productSlice', () => {
  it('should return default value', () => {
    const result = productReducer(undefined, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });
  it('add product into store', () => {
    const { store } = renderWithProviders(<Checkbox checked={false} product={mockProduct} />);

    store.dispatch(saveProduct({ ...mockProduct, checked: true }));
    const state = store.getState();
    expect(state.product.products).toHaveLength(1);
  });
});
