import { Item } from '../../../domain/item.model';

export interface ItemDetailProps {
  item: Item;
}

export const ItemDetail = (_props: ItemDetailProps) => {
  return <p>item-detail works!</p>;
};
