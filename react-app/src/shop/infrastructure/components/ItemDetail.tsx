import { Item } from '../../domain/item.model';

interface ItemDetailProps {
  item?: Item;
}

// Mirrors ItemDetailComponent. Not wired into routing in the Angular app.
export default function ItemDetail(_props: ItemDetailProps) {
  return <p>item-detail works!</p>;
}
