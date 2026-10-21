import type { Item } from '../../domain/item.model';

export interface AddItemProps {
  onSave?: (item: Item) => void;
}

// Placeholder: replaced by the AddItem child (port of add-item.component form).
export function AddItem(_props: AddItemProps) {
  return <p>add-item works!</p>;
}
