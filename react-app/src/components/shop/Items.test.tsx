import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Items,
  INITIAL_ITEMS,
  nextSortState,
  sortItems,
  type SortState,
} from './Items';

// Converted from items.component.spec.ts. The original component sorts with
// String.localeCompare (lexicographic), so price comparisons are lexicographic
// too. These assertions reflect the component's actual behaviour.
describe('Items - sort logic', () => {
  describe('Initial state', () => {
    it('has 5 seed items', () => {
      expect(INITIAL_ITEMS).toHaveLength(5);
    });
  });

  describe('nextSortState (toggle behaviour)', () => {
    it('toggles asc -> desc when re-selecting the active field', () => {
      const state: SortState = { sortBy: 'name', sortOrder: 'asc' };
      expect(nextSortState(state, 'name')).toEqual({
        sortBy: 'name',
        sortOrder: 'desc',
      });
    });

    it('toggles desc -> asc when re-selecting the active field', () => {
      const state: SortState = { sortBy: 'price', sortOrder: 'desc' };
      expect(nextSortState(state, 'price')).toEqual({
        sortBy: 'price',
        sortOrder: 'asc',
      });
    });

    it('resets to asc when switching to a different field', () => {
      const state: SortState = { sortBy: 'name', sortOrder: 'desc' };
      expect(nextSortState(state, 'price')).toEqual({
        sortBy: 'price',
        sortOrder: 'asc',
      });
    });
  });

  describe('sortItems', () => {
    it('sorts by name ascending', () => {
      const result = sortItems(INITIAL_ITEMS, { sortBy: 'name', sortOrder: 'asc' });
      expect(result.map((i) => i.name)).toEqual([
        'apple',
        'banana',
        'foo',
        'luigi',
        'mario',
      ]);
    });

    it('sorts by name descending', () => {
      const result = sortItems(INITIAL_ITEMS, { sortBy: 'name', sortOrder: 'desc' });
      expect(result[0].name).toBe('mario');
      expect(result[result.length - 1].name).toBe('apple');
    });

    it('sorts by description ascending', () => {
      const result = sortItems(INITIAL_ITEMS, {
        sortBy: 'description',
        sortOrder: 'asc',
      });
      expect(result[0].description).toBe('bar');
      expect(result[result.length - 1].description).toBe('fruit');
    });

    it('sorts by price lexicographically (localeCompare) ascending', () => {
      const result = sortItems(INITIAL_ITEMS, {
        sortBy: 'price',
        sortOrder: 'asc',
      });
      expect(result.map((i) => i.price)).toEqual([
        '123',
        '456',
        '59',
        '789',
        '99',
      ]);
    });

    it('handles single item arrays', () => {
      const single = [{ name: 'single', description: 'item', price: '100' }];
      const result = sortItems(single, { sortBy: 'name', sortOrder: 'asc' });
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('single');
    });

    it('handles empty arrays', () => {
      expect(sortItems([], { sortBy: 'name', sortOrder: 'asc' })).toEqual([]);
    });

    it('does not mutate the input array', () => {
      const input = [...INITIAL_ITEMS];
      sortItems(input, { sortBy: 'price', sortOrder: 'desc' });
      expect(input).toEqual(INITIAL_ITEMS);
    });
  });
});

describe('Items - rendering & interaction', () => {
  const renderedNames = () =>
    screen
      .getAllByText(/^(foo|mario|luigi|apple|banana)$/)
      .map((el) => el.textContent);

  it('renders the heading and three sort buttons', () => {
    render(<Items />);
    expect(screen.getByText('Shop Items')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Name/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Description/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Price/ })).toBeInTheDocument();
  });

  it('renders items in seed order initially', () => {
    render(<Items />);
    expect(renderedNames()).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
  });

  it('toggles the already-active name field to descending on first click', async () => {
    // Initial sort state is name/asc (matching Angular), so clicking the active
    // Name field toggles it to descending.
    render(<Items />);
    await userEvent.click(screen.getByRole('button', { name: /Name/ }));
    expect(renderedNames()).toEqual(['mario', 'luigi', 'foo', 'banana', 'apple']);
  });

  it('toggles back to ascending when the active sort button is clicked twice', async () => {
    render(<Items />);
    const nameButton = screen.getByRole('button', { name: /Name/ });
    await userEvent.click(nameButton);
    await userEvent.click(nameButton);
    expect(renderedNames()).toEqual(['apple', 'banana', 'foo', 'luigi', 'mario']);
  });

  it('sorts by price lexicographically when switching to the Price field', async () => {
    render(<Items />);
    await userEvent.click(screen.getByRole('button', { name: /Price/ }));
    // localeCompare ascending: 123, 456, 59, 789, 99 -> foo, mario, banana, luigi, apple
    expect(renderedNames()).toEqual(['foo', 'mario', 'banana', 'luigi', 'apple']);
  });
});
