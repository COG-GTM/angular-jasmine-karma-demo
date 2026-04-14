import React from 'react';
import { Item } from '../../../domain/item.model';
// TODO: The original Angular component used Angular Material (mat-card, mat-icon).
// When integrating into a React app, consider using a Material UI library
// (e.g., @mui/material) or custom styled components to match the original design.
import './item.component.scss';

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
