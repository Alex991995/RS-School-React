import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import DetailCard from '@/pages/details/[id]';
import { expect, describe, it, jest } from '@jest/globals';
import { arrayMockProduct, mockProduct } from '@/utils/mock/mockdata';
import { renderWithProviders } from '@/utils/test-utils';

describe('DetailCard component', () => {
  it('render  DetailCard', () => {
    const { container } = renderWithProviders(<DetailCard product={mockProduct} />);
    expect(container).toBeInTheDocument();
  });
});
