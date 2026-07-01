export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export const Item = ({ name, description, price }: ItemProps) => {
  const like = () => {
    console.info('like ' + name);
  };

  return null;
};
