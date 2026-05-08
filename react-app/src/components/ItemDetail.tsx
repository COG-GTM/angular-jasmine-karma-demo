import type { Item } from "../models/Item";

interface ItemDetailProps {
  item: Item;
}

export default function ItemDetail({ item }: ItemDetailProps) {
  return (
    <div>
      <p>item-detail works!</p>
      <p>
        {item.name} - {item.description} - {item.price} &euro;
      </p>
    </div>
  );
}
