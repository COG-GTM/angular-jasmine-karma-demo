import './Item.scss';

interface ItemProps {
  name: string;
  description: string;
  price: string;
  onLike?: () => void;
}

export function Item({ name, description, price, onLike }: ItemProps) {
  const handleLike = () => {
    console.info('like ' + name);
    onLike?.();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{name}</h3>
      </div>
      <div className="card-content">
        <p>{price} &euro;</p>
        <p>{description}</p>
        <button
          className="like-btn"
          aria-label="like"
          onClick={handleLike}
        >
          <span className="material-icons">favorite</span>
        </button>
      </div>
    </div>
  );
}
