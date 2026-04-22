import { Item } from "../components/Item";

const HARDCODED_ITEMS = [
  { name: "foo", description: "bar", price: "123" },
  { name: "mario", description: "bross", price: "456" },
  { name: "luigi", description: "bross", price: "789" },
] as const;

export function Items() {
  return (
    <div className="items">
      <p>items shop</p>
      {HARDCODED_ITEMS.map((item) => (
        <Item
          key={item.name}
          name={item.name}
          description={item.description}
          price={item.price}
        />
      ))}
    </div>
  );
}

export default Items;
