import type { Item } from '../../domain/item.model';

export interface ItemDetailProps {
  item?: Item;
}

export default function ItemDetail(_props: ItemDetailProps) {
  return <p>item-detail works!</p>;
}
