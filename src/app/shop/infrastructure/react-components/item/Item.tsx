import type { Item as ItemModel } from '../../../domain/item.model';

export interface ItemProps extends ItemModel {
  onLike?: (name: string) => void;
}

export const Item = (props: ItemProps) => {
  const { name } = props;

  const like = (): void => {
    console.info('like ' + name);
    props.onLike?.(name);
  };

  void like;

  return null;
};
