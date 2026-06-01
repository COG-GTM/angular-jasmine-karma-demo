import { Item } from '../../../domain/item.model';

interface ItemDetailComponentProps {
  item: Item;
}

export const ItemDetailComponent = ({ item }: ItemDetailComponentProps) => {
  return <p>item-detail works!</p>;
};
