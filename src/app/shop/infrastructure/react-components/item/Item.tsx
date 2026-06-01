// TODO: Replace with the real implementation from the sibling ItemComponent
// migration PR. This placeholder exists only so that Items.tsx compiles while
// the ItemComponent → React migration is in a separate session/PR.
import { Item as ItemModel } from '../../../domain/item.model';

export interface ItemProps {
  item: ItemModel;
}

export const Item = (props: ItemProps): JSX.Element => {
  const { item } = props;
  return (
    <div>
      {item.name} - {item.description} - {item.price}
    </div>
  );
};
