import React from 'react';
import './Item.css';

export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export const Item = ({ name, description, price }: ItemProps) => {
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
        {/* TODO: external dep — Angular Material (mat-icon-button/mat-icon "favorite").
            Replaced with a plain button + heart glyph to keep this component self-contained. */}
        <button className="like-button" aria-label="like" onClick={like}>
          <span className="material-icon">♥</span>
        </button>
      </div>
    </div>
  );
};
