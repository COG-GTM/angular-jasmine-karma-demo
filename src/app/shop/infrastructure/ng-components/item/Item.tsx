import React from 'react';

export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export const Item = ({ name, description, price }: ItemProps) => {
  const like = (): void => {
    console.info('like ' + name);
  };

  return null;
};
