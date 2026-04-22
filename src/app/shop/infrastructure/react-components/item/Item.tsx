import type { Item as ItemModel } from '../../../domain/item.model';
import './Item.scss';

export interface ItemProps extends ItemModel {
  onLike?: (name: string) => void;
}

export const Item = (props: ItemProps) => {
  const { name, description, price } = props;

  const like = (): void => {
    console.info('like ' + name);
    props.onLike?.(name);
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
