import type { Item } from '../types/item';

interface ItemDetailProps {
  item?: Item;
}

export default function ItemDetail({ item }: ItemDetailProps) {
  void item;
  return <p>item-detail works!</p>;
}
