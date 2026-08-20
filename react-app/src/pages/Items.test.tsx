import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Items from './Items';

const renderedNames = () =>
  screen
    .getAllByRole('heading', { level: 2 })
    .slice(1)
    .map((node) => node.textContent);

describe('Items page', () => {
  it('renders every item in its initial order', () => {
    render(<Items />);

    expect(screen.getByText('Shop Items')).toBeInTheDocument();
    expect(renderedNames()).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
  });

  it('toggles the name order on repeated clicks (name is the initial sort field)', async () => {
    render(<Items />);
    const nameButton = screen.getByRole('button', { name: /^Name/ });

    await userEvent.click(nameButton);
    expect(renderedNames()).toEqual(['mario', 'luigi', 'foo', 'banana', 'apple']);
    expect(nameButton).toHaveTextContent('↓');

    await userEvent.click(nameButton);
    expect(renderedNames()).toEqual(['apple', 'banana', 'foo', 'luigi', 'mario']);
    expect(nameButton).toHaveTextContent('↑');
  });

  it('resets to ascending when the sort field changes', async () => {
    render(<Items />);

    await userEvent.click(screen.getByRole('button', { name: /^Name/ }));
    const priceButton = screen.getByRole('button', { name: /^Price/ });
    await userEvent.click(priceButton);

    expect(renderedNames()).toEqual(['foo', 'mario', 'banana', 'luigi', 'apple']);
    expect(priceButton).toHaveClass('active');
    expect(priceButton).toHaveTextContent('↑');
  });
});
