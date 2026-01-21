interface ItemComponentProps {
  name: string;
  description: string;
  price: string;
}

export const ItemComponent = (props: ItemComponentProps) => {
  const like = () => {
    console.info('like ' + props.name);
  };

  return null;
};
