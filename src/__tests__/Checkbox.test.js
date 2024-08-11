import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import Checkbox from '../components/Checkbox';
import { expect, describe, it } from '@jest/globals';
import { renderWithProviders } from '@/utils/test-utils';
import { mockProduct } from '@/utils/mock/mockdata';
import userEvent from '@testing-library/user-event';

import { setupStore } from '@/features/store';

import { ThemeProvider } from '@/hoc/theme';

describe('Checkbox component', () => {
  it('Checkbox add to store selected product', async () => {
    const store = setupStore();

    renderWithProviders(
      <ThemeProvider>
        <Checkbox checked={false} product={mockProduct} />
      </ThemeProvider>,
      { store },
    );

    const checkbox = screen.getByRole('checkbox');

    await userEvent.click(checkbox);

    const state = store.getState();
    expect(state.product.products).toHaveLength(mockProduct.length);
  });
});
