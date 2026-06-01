import React from 'react';
import './ItemComponent.css';

interface ItemComponentProps {
  name: string;
  description: string;
  price: string;
}

export const ItemComponent: React.FC<ItemComponentProps> = ({ name, description, price }) => {
  const handleLike = (): void => {
    console.info('like ' + name);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{name}</h2>
      </div>
      <div className="card-content">
        <p>{price} &euro;</p>
        <p>{description}</p>
        <button
          className="like-button"
          aria-label="like"
          onClick={handleLike}
        >
          {/* TODO: Replace with Material Icons integration if available */}
          <span className="material-icons">favorite</span>
        </button>
      </div>
    </div>
  );
};
