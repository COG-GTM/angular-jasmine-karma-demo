import { like } from '../utils/like';
import './Item.scss';

interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export default function Item({ name, description, price }: ItemProps) {
  return (
    <div className="mat-card card">
      <div className="mat-card-header">
        <h2 className="mat-card-title">{name}</h2>
      </div>
      <div className="mat-card-content">
        <p>{price} €</p>
        <p>{description}</p>
        <button
          type="button"
          className="mat-icon-button"
          aria-label="like"
          onClick={() => like(name)}
        >
          <span className="material-icons">favorite</span>
        </button>
      </div>
    </div>
  );
}
