import { renderHook, screen } from '@testing-library/react';

import CardDetails from '../pages/CardDetails';
import { Provider } from 'react-redux';
import { setupStore } from '../features/store';
import { MemoryRouter } from 'react-router-dom';

import { renderWithProviders } from '../utils/test-utils';

import { productApi } from '../features/slices/apiSlice';

function Wrapper(props: { children: React.ReactNode }) {
  return <Provider store={setupStore()}>{props.children}</Provider>;
}

describe('CardDetails', () => {
  it('loading indicator is displayed while fetching data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>,
    );

    renderHook(() => productApi.useGetSingleProductQuery('1'), {
      wrapper: Wrapper,
    });
    expect(screen.getByRole('loader')).toBeInTheDocument();
    screen.debug();
  }),
    it('clicking the close button hides the component', () => {}),
    it('Ensure that clicking the close button hides the component', async () => {});
});
