import { render, screen } from '@testing-library/react';
import CardList from '../components/CardList';

describe('CardList component', () => {
  it('show text if list are empty', () => {
    render(<CardList data={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
  it('show li', () => {
    const listitem = screen.queryAllByRole('listitem');
    listitem.forEach(li => {
      expect(li).toHaveBeenCalledTimes(10);
    });
  });
});
