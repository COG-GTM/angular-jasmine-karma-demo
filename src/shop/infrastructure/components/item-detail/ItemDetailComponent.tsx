import type { Item } from '../../../domain/item.model';

export interface ItemDetailComponentProps {
  item?: Item;
}

/** Port of item-detail.component: accepts an `item` input but only renders a static message. Not routed, as in Angular. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ItemDetailComponent(_props: ItemDetailComponentProps) {
  return <p>item-detail works!</p>;
}
