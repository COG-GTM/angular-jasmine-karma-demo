import type { Item } from "../domain/item.model";

/**
 * ItemDetail: React port of the Angular `ItemDetailComponent`.
 *
 * Angular pattern replaced:
 *   - `@Input() item: Item` → typed React prop `item: Item`.
 *
 * The spec in the Angular version only asserts that the `@Input()` binding
 * received the parent's values; we preserve the same educational focus here
 * by exposing each field in the rendered output so the test can read them.
 */
export interface ItemDetailProps {
  item: Item;
}

export function ItemDetail({ item }: ItemDetailProps) {
  return (
    <div className="card" data-testid="item-detail">
      <p>item-detail works!</p>
      <dl>
        <dt>name</dt>
        <dd data-testid="item-detail-name">{item.name}</dd>
        <dt>description</dt>
        <dd data-testid="item-detail-description">{item.description}</dd>
        <dt>price</dt>
        <dd data-testid="item-detail-price">{item.price}</dd>
      </dl>
    </div>
  );
}

export default ItemDetail;
