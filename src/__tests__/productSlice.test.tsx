import productReducer from '../features/slices/productSlice';

describe('productSlice', () => {
  it('should return default value', () => {
    const result = productReducer(undefined, { type: '' });
    expect(result).toEqual({ products: [] });
  });
});
