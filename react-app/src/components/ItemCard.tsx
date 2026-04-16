import { Item } from '../models/item';

interface ItemCardProps extends Item {}

function ItemCard({ name, description, price }: ItemCardProps) {
  const handleLike = () => {
    console.info('like ' + name);
  };

  return (
    <div className="mat-card card">
      <div className="mat-card-header">
        <div className="mat-card-title">{name}</div>
      </div>
      <div className="mat-card-content">
        <p>{price} \u20ac</p>
        <p>{description}</p>
        <button
          className="mat-icon-button"
          aria-label="like"
          onClick={handleLike}
          style={{ color: '#f44336', background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}
        >
          \u2764
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
