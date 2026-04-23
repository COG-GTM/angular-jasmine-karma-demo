import React, { useEffect } from 'react';

interface ItemProps {
  name: string;
  description: string;
  price: string;
}

const Item: React.FC<ItemProps> = ({ name, description, price }) => {
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
        <button className="like-button" aria-label="like" onClick={like}>
          &#x2764;
        </button>
      </div>
    </div>
  );
};

export const ItemsComponent: React.FC = () => {
  // Explicit replacement of Angular ngOnInit (was empty)
  useEffect(() => {
    // ngOnInit was empty — no initialization logic
  }, []);

  return (
    <div>
      <p>items shop</p>
      {/* TODO: Replace inline Item with shared React Item component once migrated */}
      <Item name="foo" description="bar" price="123" />
      <Item name="mario" description="bross" price="456" />
      <Item name="luigi" description="bross" price="789" />
    </div>
  );
};
