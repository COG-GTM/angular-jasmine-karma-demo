import type { Item } from '../../domain/item.model';

export interface ItemDetailProps {
  item?: Item;
}

// Port of ItemDetailComponent. As in the Angular app, the template only renders
// a placeholder and the component is not wired into any route.
export function ItemDetail(_props: ItemDetailProps) {
  return <p>item-detail works!</p>;
}
