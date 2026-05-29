import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Items } from './Items';

describe('Items', () => {
  it('should render 5 items', () => {
    render(<Items />);
    const cards = screen.getAllByText(/€/);
    expect(cards.length).toBe(5);
  });

  it('should have items sorted by name ascending by default', () => {
    render(<Items />);
    const titles = screen.getAllByRole('heading', { level: 3 });
    const names = titles.map(t => t.textContent);
    expect(names).toEqual(['apple', 'banana', 'foo', 'luigi', 'mario']);
  });

  it('should toggle sort order when clicking same field', async () => {
    const user = userEvent.setup();
    render(<Items />);
    await user.click(screen.getByText(/^Name/));
    const titles = screen.getAllByRole('heading', { level: 3 });
    const names = titles.map(t => t.textContent);
    expect(names).toEqual(['mario', 'luigi', 'foo', 'banana', 'apple']);
  });

  it('should sort by description when description button clicked', async () => {
    const user = userEvent.setup();
    render(<Items />);
    await user.click(screen.getByText(/^Description/));
    const titles = screen.getAllByRole('heading', { level: 3 });
    const firstItem = titles[0].textContent;
    expect(firstItem).toBe('foo');
  });

  it('should sort by price when price button clicked', async () => {
    const user = userEvent.setup();
    render(<Items />);
    await user.click(screen.getByText(/^Price/));
    const titles = screen.getAllByRole('heading', { level: 3 });
    const names = titles.map(t => t.textContent);
    // string localeCompare: "123" < "456" < "59" < "789" < "99"
    expect(names).toEqual(['foo', 'mario', 'banana', 'luigi', 'apple']);
  });

  it('should reset to ascending when switching sort field', async () => {
    const user = userEvent.setup();
    render(<Items />);
    await user.click(screen.getByText(/^Name/));
    await user.click(screen.getByText(/^Price/));
    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles[0].textContent).toBe('foo');
  });
});
