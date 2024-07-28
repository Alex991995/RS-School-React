import { screen } from '@testing-library/react';
import CardDetails from '../pages/CardDetails';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/test-utils';

describe('CardDetails', () => {
  it('loading indicator is displayed while fetching data', () => {
    renderWithProviders(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>,
    );

    expect(screen.getByRole('loader')).toBeInTheDocument();
  });
});
