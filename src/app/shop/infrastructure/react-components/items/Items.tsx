import React from 'react';

interface ItemProps {
  name: string;
  description: string;
  price: string;
}

// TODO: Item component needs to be migrated separately from Angular
// For now, creating a placeholder that matches the Angular ItemComponent interface
const Item: React.FC<ItemProps> = ({ name, description, price }) => {
  const handleLike = () => {
    console.info('like ' + name);
  };

  return (
    <div className="item">
      <p>Name: {name}</p>
      <p>Description: {description}</p>
      <p>Price: {price}</p>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export const Items: React.FC = () => {
  return (
    <div>
      <p>items shop</p>
      <Item name="foo" description="bar" price="123" />
      <Item name="mario" description="bross" price="456" />
      <Item name="luigi" description="bross" price="789" />
    </div>
  );
};
