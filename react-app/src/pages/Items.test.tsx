import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Items from './Items';

const names = () => screen.getAllByRole('heading', { level: 2 }).slice(1).map((h) => h.textContent);

describe('Items page', () => {
  it('renders every item', () => {
    render(<Items />);

    expect(names()).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
  });

  it('toggles the sort direction on repeated clicks of the active field', async () => {
    render(<Items />);
    const nameButton = screen.getByRole('button', { name: /^Name/ });

    await userEvent.click(nameButton);
    expect(names()).toEqual(['mario', 'luigi', 'foo', 'banana', 'apple']);

    await userEvent.click(nameButton);
    expect(names()).toEqual(['apple', 'banana', 'foo', 'luigi', 'mario']);
  });
});
