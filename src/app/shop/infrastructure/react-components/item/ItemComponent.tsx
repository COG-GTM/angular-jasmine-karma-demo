import React from 'react';

interface ItemComponentProps {
  name: string;
  description: string;
  price: string;
  onLike?: () => void;
}

export const ItemComponent: React.FC<ItemComponentProps> = ({
  name,
  description,
  price,
  onLike,
}) => {
  const handleLike = () => {
    console.info('like ' + name);
    if (onLike) {
      onLike();
    }
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-header">
        <h3 className="card-title">{name}</h3>
      </div>
      <div className="card-content">
        <p>{price} &euro;</p>
        <p>{description}</p>
        <button
          type="button"
          aria-label="like"
          onClick={handleLike}
          style={buttonStyle}
        >
          <span role="img" aria-label="favorite">&#10084;</span>
        </button>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  border: '0.1rem solid lightgrey',
  boxShadow: '0.3rem 0.3rem lightgrey',
  marginTop: '1rem',
  width: '90%',
};

const buttonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#f44336',
  cursor: 'pointer',
  fontSize: '1.5rem',
};
