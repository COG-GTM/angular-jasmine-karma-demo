import type { Item } from '../../types/item';

// Ported from item-detail.component.ts / .html
// The Angular template only renders a static string; the `item` @Input is kept
// as a prop to preserve the contract (and its tests).
export interface ItemDetailProps {
  item?: Item | null;
}

export const ItemDetail = (_props: ItemDetailProps) => {
  return <p>item-detail works!</p>;
};
