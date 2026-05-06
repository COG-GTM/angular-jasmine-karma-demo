import type { Item } from '../../../models/item.model';

interface ItemDetailProps {
  item: Item;
}

export function ItemDetail({ item: _item }: ItemDetailProps) {
  return (
    <p>item-detail works!</p>
  );
}
