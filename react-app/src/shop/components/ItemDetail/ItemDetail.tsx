import type { Item } from '../../domain/item.model';

export interface ItemDetailProps {
  item?: Item | null;
}

// Placeholder: replaced by the ItemDetail child (port of item-detail.component).
export function ItemDetail(_props: ItemDetailProps) {
  return <p>item-detail works!</p>;
}
