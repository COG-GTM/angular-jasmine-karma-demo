import type { Item } from "../types/item";

export interface ItemDetailProps {
  item?: Item;
}

export function ItemDetail({ item }: ItemDetailProps) {
  return (
    <div className="item-detail">
      <p>item-detail works!</p>
      {item && (
        <dl>
          <dt>name</dt>
          <dd>{item.name}</dd>
          <dt>description</dt>
          <dd>{item.description}</dd>
          <dt>price</dt>
          <dd>{item.price} €</dd>
        </dl>
      )}
    </div>
  );
}

export default ItemDetail;
