import './Item.scss';

interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export function Item({ name, description, price }: ItemProps) {
  const like = () => {
    console.info('like ' + name);
  };

  return (
    <div className="mat-card card">
      <div className="mat-card-header">
        <h2 className="mat-card-title">{name}</h2>
      </div>
      <div className="mat-card-content">
        <p>{price} €</p>
        <p>{description}</p>
        <button className="mat-icon-button" aria-label="like" onClick={like}>
          <span className="material-icons">favorite</span>
        </button>
      </div>
    </div>
  );
}

export default Item;
