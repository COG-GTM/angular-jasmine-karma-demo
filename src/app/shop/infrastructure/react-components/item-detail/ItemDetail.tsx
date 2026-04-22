import { Item } from '../../../domain/item.model';

export interface ItemDetailProps {
  item: Item;
}

export const ItemDetail = (props: ItemDetailProps) => {
  const { item } = props;
  void item;
  return null;
};
