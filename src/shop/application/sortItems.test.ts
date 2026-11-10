import type { Item } from '../domain/item.model';
import { nextSortState, sortItems } from './sortItems';

const items: Item[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' },
];

describe('nextSortState', () => {
  it('toggles the order when the same field is chosen again', () => {
    expect(nextSortState({ sortBy: 'name', sortOrder: 'asc' }, 'name')).toEqual({
      sortBy: 'name',
      sortOrder: 'desc',
    });
    expect(nextSortState({ sortBy: 'name', sortOrder: 'desc' }, 'name')).toEqual({
      sortBy: 'name',
      sortOrder: 'asc',
    });
  });

  it('resets to ascending when a different field is chosen', () => {
    expect(nextSortState({ sortBy: 'price', sortOrder: 'desc' }, 'description')).toEqual({
      sortBy: 'description',
      sortOrder: 'asc',
    });
  });
});

describe('sortItems', () => {
  it('sorts by name ascending and descending', () => {
    expect(sortItems(items, { sortBy: 'name', sortOrder: 'asc' }).map((i) => i.name)).toEqual([
      'apple',
      'banana',
      'foo',
      'luigi',
      'mario',
    ]);
    expect(sortItems(items, { sortBy: 'name', sortOrder: 'desc' }).map((i) => i.name)).toEqual([
      'mario',
      'luigi',
      'foo',
      'banana',
      'apple',
    ]);
  });

  it('sorts by description and keeps ties in their existing order', () => {
    expect(
      sortItems(items, { sortBy: 'description', sortOrder: 'asc' }).map((i) => i.name),
    ).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
  });

  it('compares price as a string, exactly like the Angular component', () => {
    expect(sortItems(items, { sortBy: 'price', sortOrder: 'asc' }).map((i) => i.price)).toEqual([
      '123',
      '456',
      '59',
      '789',
      '99',
    ]);
  });

  it('does not mutate the input array', () => {
    const copy = [...items];
    sortItems(items, { sortBy: 'name', sortOrder: 'asc' });
    expect(items).toEqual(copy);
  });
});
