import { Item } from '../../../domain/item.model';

export interface ItemsProps {
  items?: Item[];
}

const DEFAULT_ITEMS: Item[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
];

export const Items = (props: ItemsProps): JSX.Element => {
  const items: Item[] = props.items ?? DEFAULT_ITEMS;
  void items;
  return <></>;
};
