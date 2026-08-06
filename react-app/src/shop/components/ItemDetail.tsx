import type { FC } from 'react';
import type { Item } from '../../domain/item.model';

export interface ItemDetailProps {
  item: Item;
}

const ItemDetail: FC<ItemDetailProps> = () => <p>item-detail works!</p>;

export default ItemDetail;
