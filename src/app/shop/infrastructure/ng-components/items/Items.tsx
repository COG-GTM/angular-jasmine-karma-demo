import React, { useState } from 'react';
import { Item as ItemModel } from '../../../domain/item.model';

const INITIAL_ITEMS: ItemModel[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
  { name: 'apple', description: 'fruit', price: '99' },
  { name: 'banana', description: 'fruit', price: '59' }
];

export const Items = () => {
  const [items, setItems] = useState<ItemModel[]>(INITIAL_ITEMS);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const applySort = (field: string, order: 'asc' | 'desc'): void => {
    setItems(prev =>
      [...prev].sort((a, b) => {
        let comparison = 0;
        const aValue = a[field as keyof ItemModel];
        const bValue = b[field as keyof ItemModel];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else {
          comparison = aValue > bValue ? 1 : -1;
        }

        return order === 'asc' ? comparison : -comparison;
      })
    );
  };

  const sortItems = (field: string): void => {
    if (sortBy === field) {
      const newOrder: 'asc' | 'desc' = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newOrder);
      applySort(field, newOrder);
    } else {
      setSortBy(field);
      setSortOrder('asc');
      applySort(field, 'asc');
    }
  };

  return null;
};
