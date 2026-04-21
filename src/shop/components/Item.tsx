/**
 * Item: React port of the Angular `ItemComponent`.
 *
 * Angular pattern replaced:
 *   - `@Input() name/description/price` → React props
 *   - `(click)="like()"` template handler → `onClick` prop on <button>
 *   - Component selector `<app-item [name]=...>` → `<Item name={...} />`
 */
export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export function Item({ name, description, price }: ItemProps) {
  const like = () => {
    // Kept for parity with the Angular version; logs when the "like" button is clicked.
    // eslint-disable-next-line no-console
    console.info("like " + name);
  };

  return (
    <div className="card" data-testid="item-card">
      <h3>{name}</h3>
      <p>{price} €</p>
      <p>{description}</p>
      <button
        type="button"
        className="like-button"
        aria-label="like"
        onClick={like}
      >
        ♥
      </button>
    </div>
  );
}

export default Item;
