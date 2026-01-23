interface ItemComponentProps {
  name: string;
  description: string;
  price: string;
}

export const ItemComponent = ({ name, description, price }: ItemComponentProps) => {
  const like = () => {
    console.info('like ' + name);
  };

  return null;
};
