import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import SelectedItems from '../components/SelectedItems';
import { expect, describe, it } from '@jest/globals';
import { mockStoredProducts } from '@/utils/mock/mockdata';
import { renderWithProviders } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';

describe('SelectedItems component', () => {
  it('render SelectedItems', async () => {
    renderWithProviders(<SelectedItems storedProducts={mockStoredProducts} />);
    const downloadLink = screen.getByRole('link', { name: /download/i });

    expect(downloadLink).toHaveAttribute(
      'href',
      expect.stringContaining('data:text/csv;charset=utf-8,'),
    );
    expect(downloadLink).toHaveAttribute('download', `${mockStoredProducts.length}_products.csv`);

    await userEvent.click(downloadLink);
    expect(downloadLink).toBeInTheDocument();
  });
});
