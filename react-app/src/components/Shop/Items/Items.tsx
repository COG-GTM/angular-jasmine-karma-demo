import { Item } from '../Item/Item';

export function Items() {
  return (
    <div>
      <p style={{ margin: '0 0 12px', fontSize: '14px', lineHeight: '20px' }}>items shop</p>
      <Item name="foo" description="bar" price="123" />
      <Item name="mario" description="bross" price="456" />
      <Item name="luigi" description="bross" price="789" />
    </div>
  );
}
