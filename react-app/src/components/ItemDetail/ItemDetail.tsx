import type { Item } from '../../types';

interface ItemDetailProps {
  item: Item;
}

export function ItemDetail({ item }: ItemDetailProps) {
  return (
    <div>
      <p>item-detail works!</p>
      <p>{item.name} - {item.description} - {item.price}</p>
    </div>
  );
}
