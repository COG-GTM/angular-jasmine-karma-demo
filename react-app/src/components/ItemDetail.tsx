import type { Item } from '../types/item';

interface ItemDetailProps {
  item?: Item | null;
}

/**
 * Ported from ItemDetailComponent. The original template renders a placeholder
 * string while receiving an `item` input from its parent; here we also surface
 * the item fields when one is provided.
 */
export function ItemDetail({ item }: ItemDetailProps) {
  return (
    <div>
      <p>item-detail works!</p>
      {item && (
        <div className="item-detail">
          <p className="item-detail-name">{item.name}</p>
          <p className="item-detail-description">{item.description}</p>
          <p className="item-detail-price">{item.price}</p>
        </div>
      )}
    </div>
  );
}

export default ItemDetail;
