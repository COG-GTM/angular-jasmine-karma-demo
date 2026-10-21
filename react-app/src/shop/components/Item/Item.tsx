export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

// Placeholder: replaced by the Item child (MUI Card port of item.component).
export function Item({ name, description, price }: ItemProps) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{price} €</p>
      <p>{description}</p>
      <button type="button" aria-label="like">
        favorite
      </button>
    </div>
  );
}
