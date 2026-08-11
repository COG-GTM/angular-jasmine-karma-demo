import type { Item } from '../types/item';

interface ItemDetailProps {
  item?: Item;
}

export function ItemDetail({ item }: ItemDetailProps) {
  return (
    <div>
      <p>item-detail works!</p>
      {item && <p>{item.name}</p>}
    </div>
  );
}

export default ItemDetail;
