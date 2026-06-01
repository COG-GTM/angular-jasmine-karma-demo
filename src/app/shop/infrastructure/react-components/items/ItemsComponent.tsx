// TODO: Import ItemComponent once it's migrated to React
// import { ItemComponent } from '../item/ItemComponent';

interface ItemProps {
  name: string;
  description: string;
  price: string;
}

// TODO: Replace with actual ItemComponent when migrated
const ItemComponent = ({ name, description, price }: ItemProps) => {
  const handleLike = () => {
    console.info('like ' + name);
  };

  return (
    <div className="item">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Price: {price}</p>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export const ItemsComponent = () => {
  return (
    <div>
      <p>items shop</p>
      <ItemComponent name="foo" description="bar" price="123" />
      <ItemComponent name="mario" description="bross" price="456" />
      <ItemComponent name="luigi" description="bross" price="789" />
    </div>
  );
};
