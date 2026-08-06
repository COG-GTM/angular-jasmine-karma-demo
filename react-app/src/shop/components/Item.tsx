import type { FC } from 'react';

export interface ItemProps {
  name?: string;
  description?: string;
  price?: string;
}

const Item: FC<ItemProps> = () => null;

export default Item;
