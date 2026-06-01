import React from 'react';

/**
 * React port of Angular ItemComponent
 *
 * Original Angular component: item.component.ts
 * - @Input() name, description, price
 * - @Output: none
 * - Services: none
 * - Lifecycle: ngOnInit (empty)
 */

interface ItemComponentProps {
  /** Name of the item */
  name: string;
  /** Description of the item */
  description: string;
  /** Price of the item */
  price: string;
  /** Callback when the like button is clicked */
  onLike?: (name: string) => void;
}

export const ItemComponent: React.FC<ItemComponentProps> = ({
  name,
  description,
  price,
  onLike,
}) => {
  const handleLike = () => {
    console.info('like ' + name);
    onLike?.(name);
  };

  return (
    <div className="card" style={{
      border: '0.1rem solid lightgrey',
      boxShadow: '0.3rem 0.3rem lightgrey',
      marginTop: '1rem',
      width: '90%',
      padding: '16px',
    }}>
      <div className="card-header">
        <h3 className="card-title">{name}</h3>
      </div>
      <div className="card-content">
        <p>{price} €</p>
        <p>{description}</p>
        <button
          onClick={handleLike}
          aria-label="like"
          style={{
            color: '#f44336',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
          }}
        >
          ♥
        </button>
      </div>
    </div>
  );
};
