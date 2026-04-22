import { useCallback } from "react";
import "./Item.scss";

export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export function Item({ name, description, price }: ItemProps) {
  const like = useCallback(() => {
    console.info("like " + name);
  }, [name]);

  return (
    <div className="card mat-card">
      <div className="mat-card-header">
        <div className="mat-card-title">{name}</div>
      </div>
      <div className="mat-card-content">
        <p>{price} €</p>
        <p>{description}</p>
        <button
          type="button"
          className="mat-icon-button mat-warn"
          aria-label="like"
          onClick={like}
        >
          <span className="material-icons">favorite</span>
        </button>
      </div>
    </div>
  );
}

export default Item;
