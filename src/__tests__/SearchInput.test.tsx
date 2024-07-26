import { render, screen } from '@testing-library/react';
import SearchInput from '../components/SearchInput';
import userEvent from '@testing-library/user-event';

const mockedOnChange = vi.fn();

describe('Searchinput component', () => {
  it('input', async () => {
    const user = userEvent.setup();
    render(<SearchInput title="title" handleChange={mockedOnChange} handelData={mockedOnChange} />);
    const input = screen.getByTestId('input') as HTMLInputElement;

    input.value = '123';
    const button = screen.getByRole('button', { name: 'Search' });

    await user.click(button);

    const storage = localStorage.getItem('title');
    console.log('storage', storage);
  });
});
