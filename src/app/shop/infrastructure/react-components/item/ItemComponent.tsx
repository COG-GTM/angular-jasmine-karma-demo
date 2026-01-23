import './ItemComponent.css';

interface ItemComponentProps {
  name: string;
  description: string;
  price: string;
}

export const ItemComponent = ({ name, description, price }: ItemComponentProps) => {
  const like = () => {
    console.info('like ' + name);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{name}</h3>
      </div>
      <div className="card-content">
        <p>{price} €</p>
        <p>{description}</p>
        <button
          className="icon-button"
          aria-label="like"
          onClick={like}
        >
          <span className="icon">❤</span>
        </button>
      </div>
    </div>
  );
};
