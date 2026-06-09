import './Item.scss';

interface ItemProps {
  name: string;
  description: string;
  price: string;
}

/**
 * Ported from ItemComponent. Renders a single shop item as a card with a
 * "like" action that logs to the console (matching the original behaviour).
 */
export function Item({ name, description, price }: ItemProps) {
  const like = () => {
    console.info('like ' + name);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{name}</h2>
      </div>
      <div className="card-content">
        <p>{price} €</p>
        <p>{description}</p>
        <button
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
