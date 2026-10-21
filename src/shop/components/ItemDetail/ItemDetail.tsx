import type { Item } from '../../domain/item.model';

export interface ItemDetailProps {
  item?: Item | null;
}

// Port of item-detail.component: receives `item` (Angular @Input) but, like the legacy
// template, renders only the static text. null and undefined items are accepted.
export function ItemDetail(_props: ItemDetailProps) {
  return <p>item-detail works!</p>;
}
