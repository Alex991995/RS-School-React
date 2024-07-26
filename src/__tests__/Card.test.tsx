import { render, screen } from '@testing-library/react';

import Card from '../components/Card';
import { MemoryRouter, Link } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CardDetails from '../pages/CardDetails';

import { renderWithProviders } from '../utils/test-utils';

describe('Card component', () => {
  it('Card renders the relevant card data;', () => {
    render(
      <MemoryRouter>
        <Card id={1} title="title" />
      </MemoryRouter>,
    );
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Link to="/hello">Click me</Link>
      </MemoryRouter>,
    );
    await user.click(screen.getByText(/Click me/i));

    const { container } = renderWithProviders(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>,
    );

    expect(container).toBeInTheDocument();
  });
  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Link to="/hello">Click me</Link>
      </MemoryRouter>,
    );
    await user.click(screen.getByText(/Click me/i));

    renderWithProviders(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>,
    );
    const loader = screen.getByRole('loader');
    expect(loader).toBeInTheDocument();
  });
});
