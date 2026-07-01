import './item.component.scss';

export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export const Item = ({ name, description, price }: ItemProps) => {
  const like = () => {
    console.info('like ' + name);
  };

  // TODO: Angular Material components (mat-card, mat-card-header, mat-card-title,
  // mat-card-content, mat-icon-button, mat-icon) have no React equivalent in this
  // repo. The structure/labels are reproduced with semantic HTML reusing the existing
  // `card` class. Swap for a React Material library (e.g. MUI Card / IconButton / Icon)
  // when one is added to the project.
  return (
    <div className="card">
      <div className="mat-card-header">
        <div className="mat-card-title">{name}</div>
      </div>
      <div className="mat-card-content">
        <p>{price} €</p>
        <p>{description}</p>
        <button aria-label="like" onClick={like}>
          favorite
        </button>
      </div>
    </div>
  );
};

export default Item;
