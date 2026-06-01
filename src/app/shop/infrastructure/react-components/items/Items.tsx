import { Item as ItemModel } from '../../../domain/item.model';
// TODO: The sibling `Item` React component is being migrated in a separate PR
// (Angular `ItemComponent` → React). A minimal placeholder lives alongside
// this file so `Items.tsx` compiles; swap to the real implementation when
// that PR lands.
import { Item } from '../item/Item';
import './Items.scss';

export interface ItemsProps {
  items?: ItemModel[];
}

const DEFAULT_ITEMS: ItemModel[] = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
];

export const Items = (props: ItemsProps): JSX.Element => {
  const items: ItemModel[] = props.items ?? DEFAULT_ITEMS;
  return (
    <>
      <p>items shop</p>
      {items.map((item: ItemModel, index: number) => (
        <Item key={`${item.name}-${index}`} item={item} />
      ))}
    </>
  );
};
