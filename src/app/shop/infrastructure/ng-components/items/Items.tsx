import React, { useEffect } from 'react';

// TODO: Import Item component once it is migrated to React
// import { Item } from './Item';

interface ItemData {
  name: string;
  description: string;
  price: string;
}

/**
 * Items container component — React equivalent of Angular ItemsComponent.
 *
 * Original Angular component:
 *   selector: 'app-items'
 *   Route: /shop
 *
 * This is a simple container that renders a heading and a static list
 * of Item child components with hardcoded data.
 */
export const Items: React.FC = () => {
  // ngOnInit was empty in the Angular version — replicated here for parity
  useEffect(() => {
    // no-op: Angular ngOnInit was empty
  }, []);

  const items: ItemData[] = [
    { name: 'foo', description: 'bar', price: '123' },
    { name: 'mario', description: 'bross', price: '456' },
    { name: 'luigi', description: 'bross', price: '789' },
  ];

  return (
    <div>
      <p>items shop</p>
      {/* TODO: Replace placeholder markup with <Item /> once ItemComponent is migrated */}
      {items.map((item) => (
        <div key={item.name} data-testid={`item-${item.name}`}>
          <span>{item.name}</span>
          <span>{item.description}</span>
          <span>{item.price}</span>
        </div>
      ))}
    </div>
  );
};
