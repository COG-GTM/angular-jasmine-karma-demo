import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ItemsPage } from './ItemsPage';

function renderedItemNames() {
  const grid = document.querySelector('.items-grid') as HTMLElement;
  return within(grid)
    .getAllByRole('heading', { level: 2 })
    .map((el) => el.textContent);
}

describe('ItemsPage (ported from ItemsComponent integration)', () => {
  it('renders the heading and the five items by default (name ascending)', () => {
    render(<ItemsPage />);
    expect(screen.getByText('Shop Items')).toBeInTheDocument();
    expect(renderedItemNames()).toEqual([
      'apple',
      'banana',
      'foo',
      'luigi',
      'mario',
    ]);
  });

  it('toggles to descending when clicking the active Name field', async () => {
    render(<ItemsPage />);
    await userEvent.click(screen.getByRole('button', { name: /^Name/ }));
    expect(renderedItemNames()).toEqual([
      'mario',
      'luigi',
      'foo',
      'banana',
      'apple',
    ]);
  });

  it('sorts by price ascending (string comparison) when Price is clicked', async () => {
    render(<ItemsPage />);
    await userEvent.click(screen.getByRole('button', { name: /^Price/ }));
    const grid = document.querySelector('.items-grid') as HTMLElement;
    const prices = within(grid)
      .getAllByText(/€$/)
      .map((el) => el.textContent);
    expect(prices).toEqual(['123 €', '456 €', '59 €', '789 €', '99 €']);
  });

  it('marks the active sort button', async () => {
    render(<ItemsPage />);
    const priceBtn = screen.getByRole('button', { name: /^Price/ });
    await userEvent.click(priceBtn);
    expect(priceBtn).toHaveClass('active');
  });
});
