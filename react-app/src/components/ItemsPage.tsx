import ItemCard from './ItemCard';

const items = [
  { name: 'foo', description: 'bar', price: '123' },
  { name: 'mario', description: 'bross', price: '456' },
  { name: 'luigi', description: 'bross', price: '789' },
];

function ItemsPage() {
  return (
    <div>
      <p>items shop</p>
      {items.map((item) => (
        <ItemCard key={item.name} {...item} />
      ))}
    </div>
  );
}

export default ItemsPage;
