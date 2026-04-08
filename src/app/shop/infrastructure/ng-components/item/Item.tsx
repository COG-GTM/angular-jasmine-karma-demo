import React from 'react';

interface ItemProps {
  name: string;
  description: string;
  price: string;
}

/**
 * React equivalent of the Angular `ItemComponent` (shop/item).
 *
 * Displays a shop item card with name, price, description,
 * and a "like" button. Uses plain HTML/CSS to replicate the
 * Angular Material card layout.
 */
export const Item: React.FC<ItemProps> = ({ name, description, price }) => {
  const like = () => {
    console.info('like ' + name);
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
          className="icon-button"
          aria-label="like"
          onClick={like}
          style={{ color: '#f44336' }}
        >
          &#9829; {/* heart icon — equivalent of mat-icon "favorite" */}
        </button>
      </div>
    </div>
  );
};
