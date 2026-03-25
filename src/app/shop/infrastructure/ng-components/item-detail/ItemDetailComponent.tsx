import React, { useEffect } from 'react';
import { Item } from '../../../domain/item.model';

interface ItemDetailComponentProps {
  item: Item;
}

export const ItemDetailComponent: React.FC<ItemDetailComponentProps> = ({ item }) => {
  // Equivalent of ngOnInit — empty in the original Angular component
  useEffect(() => {
    // no-op, matching Angular's empty ngOnInit
  }, []);

  return (
    <p>item-detail works!</p>
  );
};
