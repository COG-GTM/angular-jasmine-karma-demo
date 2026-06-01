import type { Item as ItemModel } from '../../../domain/item.model';
import './Item.scss';

// TODO: `@angular/material` (mat-card, mat-icon-button, mat-icon) has no React
// equivalent installed in this repo. Rendering uses semantic HTML with
// Material-compatible class names so styling can be layered in a follow-up
// (e.g., via `@mui/material`) without changing consumers of this component.

export interface ItemProps extends ItemModel {
  onLike?: (name: string) => void;
}

export const Item = (props: ItemProps) => {
  const { name, description, price, onLike } = props;

  const like = (): void => {
    console.info('like ' + name);
    onLike?.(name);
  };

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
          <span className="mat-icon material-icons">favorite</span>
        </button>
      </div>
    </div>
  );
};
