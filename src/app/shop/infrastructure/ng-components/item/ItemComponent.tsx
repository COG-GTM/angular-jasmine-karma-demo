import React from 'react';
import { Item } from '../../../domain/item.model';

interface ItemComponentProps {
  name: Item['name'];
  description: Item['description'];
  price: Item['price'];
}

export const ItemComponent: React.FC<ItemComponentProps> = ({ name, description, price }) => {
  const like = (): void => {
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
          type="button"
          className="like-button"
          aria-label="like"
          onClick={like}
        >
          ❤
        </button>
      </div>
    </div>
  );
};
