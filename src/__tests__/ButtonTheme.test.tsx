import { render, screen } from '@testing-library/react';
import ButtonTheme from '../components/ButtonTheme';
import userEvent from '@testing-library/user-event';

describe('ButtonTheme component', () => {
  it('by click change color', async () => {
    const user = userEvent.setup();
    render(<ButtonTheme onSwitch={vi.fn()} theme={false} />);
    const buttonTheme = screen.getByRole('button-theme');

    await user.click(buttonTheme);
    expect(buttonTheme).toHaveTextContent('Switch on light');
  });
});
