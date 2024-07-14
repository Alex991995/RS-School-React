import { render } from '@testing-library/react';

import Card from '../components/Card';
import { MemoryRouter } from 'react-router-dom';

describe('Card component', () => {
  it('Card renders the relevant card data;', () => {
    render(
      <MemoryRouter>
        <Card id={1} title="title" />
      </MemoryRouter>,
    );
  });
});
