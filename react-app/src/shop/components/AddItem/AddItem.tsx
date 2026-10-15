import type { Item } from '../../domain/item.model';

export interface AddItemProps {
  onSave?: (item: Item) => void;
}

export default function AddItem(_props: AddItemProps) {
  return <p>AddItem placeholder</p>;
}
