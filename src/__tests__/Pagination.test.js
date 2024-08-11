import '@testing-library/jest-dom';

import Pagination from '@/components/Pagination';
import { describe, it, jest } from '@jest/globals';

import { renderWithProviders } from '@/utils/test-utils';

import setupStore from '@/features/store';

describe('SearchPage component', () => {
  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(f => f()),
  }));

  it('render  SearchPage', async () => {
    const store = setupStore();
    const { container } = renderWithProviders(<Pagination />);
  });
});
