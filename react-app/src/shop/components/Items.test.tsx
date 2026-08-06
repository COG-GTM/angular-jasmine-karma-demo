import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import styles from './Items.module.css';
import Items from './Items';

const itemNames = (): string[] =>
  screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent ?? '');

describe('Items', () => {
  it('renders five items in name ascending order by default', () => {
    render(<Items />);

    expect(itemNames()).toEqual(['apple', 'banana', 'foo', 'luigi', 'mario']);
    expect(screen.getByRole('button', { name: /^Name ↑$/ })).toHaveClass(styles.active);
    expect(screen.getByRole('button', { name: /^Description$/ })).not.toHaveClass(styles.active);
    expect(screen.getByRole('button', { name: /^Price$/ })).not.toHaveClass(styles.active);
  });

  it('sorts by the selected field ascending when its button is clicked', () => {
    render(<Items />);

    fireEvent.click(screen.getByRole('button', { name: /^Description$/ }));

    expect(itemNames()).toEqual(['foo', 'luigi', 'mario', 'apple', 'banana']);
    expect(screen.getByRole('button', { name: /^Description ↑$/ })).toHaveClass(styles.active);
    expect(screen.getByRole('button', { name: /^Name$/ })).not.toHaveClass(styles.active);
  });

  it('toggles the selected field to descending on a second click', () => {
    render(<Items />);
    const nameButton = screen.getByRole('button', { name: /^Name ↑$/ });

    fireEvent.click(nameButton);

    expect(itemNames()).toEqual(['mario', 'luigi', 'foo', 'banana', 'apple']);
    expect(screen.getByRole('button', { name: /^Name ↓$/ })).toHaveClass(styles.active);
  });

  it('resets to ascending when switching to a different field', () => {
    render(<Items />);
    fireEvent.click(screen.getByRole('button', { name: /^Name ↑$/ }));
    fireEvent.click(screen.getByRole('button', { name: /^Price$/ }));

    expect(itemNames()).toEqual(['foo', 'mario', 'banana', 'luigi', 'apple']);
    expect(screen.getByRole('button', { name: /^Price ↑$/ })).toHaveClass(styles.active);
    expect(screen.getByRole('button', { name: /^Name$/ })).not.toHaveClass(styles.active);
  });

  it('changes the arrow and active class when toggling sort order', () => {
    render(<Items />);
    const nameButton = screen.getByRole('button', { name: /^Name ↑$/ });

    expect(nameButton).toHaveTextContent('Name ↑');
    expect(nameButton).toHaveClass(styles.active);

    fireEvent.click(nameButton);

    expect(screen.getByRole('button', { name: /^Name ↓$/ })).toHaveTextContent('Name ↓');
    expect(screen.getByRole('button', { name: /^Name ↓$/ })).toHaveClass(styles.active);
  });
});
