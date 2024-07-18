import { render, screen } from '@testing-library/react';

import Card from '../components/Card';
import { MemoryRouter, Link } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CardDetails from '../pages/CardDetails';

describe('Card component', () => {
  it('Card renders the relevant card data;', () => {
    render(
      <MemoryRouter>
        <Card id={1} title="title" />
      </MemoryRouter>,
    );
  });

  it('by click opens CardDetails component', () => {
    //  const link = screen.getByRole('link')
    render(
      <MemoryRouter>
        <Link to="/hello">Click me</Link>
      </MemoryRouter>,
    );
    // console.log(   screen.getByText(/Click me/i)     )
    userEvent.click(screen.getByText(/Click me/i));

    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>,
    );

    const button = screen.queryByRole('button');

    // expect(button)
    console.log('button', button);
  });
});
