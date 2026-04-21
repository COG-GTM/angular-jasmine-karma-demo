import { Item } from "./Item";

/**
 * Items: React port of the Angular `ItemsComponent`.
 *
 * The Angular template hard-coded three `<app-item>` children to demonstrate
 * rendering lists of children. We preserve the same behavior here so the
 * `/shop` route shows three items by default.
 */
const demoItems = [
  { name: "foo", description: "bar", price: "123" },
  { name: "mario", description: "bross", price: "456" },
  { name: "luigi", description: "bross", price: "789" },
];

export function Items() {
  return (
    <div>
      <p>items shop</p>
      {demoItems.map((item) => (
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
