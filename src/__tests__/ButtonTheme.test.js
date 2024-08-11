import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { expect, describe, it, jest } from '@jest/globals';
import ButtonTheme from '../components/ButtonTheme';
import userEvent from '@testing-library/user-event';

describe('ButtonTheme component', () => {
  it('Button change color', async () => {
    render(<ButtonTheme onSwitch={jest.fn()} theme={false} />);
    const button = screen.getByRole('button-theme');

    await userEvent.click(button);
    const changedContext = within(button).getByText('Switch on light');
    expect(changedContext).toBeInTheDocument();
  });
});
