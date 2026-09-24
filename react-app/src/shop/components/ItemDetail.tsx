import type { Item } from '../domain/item.model';
import './ItemDetail.css';

export interface ItemDetailProps {
  item?: Item | null;
}

export default function ItemDetail({ item }: ItemDetailProps) {
  return (
    <div className="item-detail" data-testid="item-detail">
      <p>item-detail works!</p>
      {item && (
        <dl className="item-detail__fields">
          <dt>Name</dt>
          <dd data-testid="item-detail-name">{item.name}</dd>
          <dt>Description</dt>
          <dd data-testid="item-detail-description">{item.description}</dd>
          <dt>Price</dt>
          <dd data-testid="item-detail-price">{item.price} €</dd>
        </dl>
      )}
    </div>
  );
}
