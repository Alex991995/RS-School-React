import { screen } from '@testing-library/react';
import CardList from '../components/CardList';
import { renderWithProviders } from '../utils/test-utils';

describe('CardList component', () => {
  it('show text if list are empty', () => {
    renderWithProviders(<CardList data={[]} />);
    const noData = screen.getByText('No data');

    expect(noData).toBeInTheDocument();
  });

  it('show li', () => {
    const listitem = screen.queryAllByRole('listitem');
    listitem.forEach(li => {
      expect(li).toHaveBeenCalledTimes(10);
    });
  });
});
