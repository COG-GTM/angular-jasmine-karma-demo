import { useState } from 'react';

interface AddItemProps {}

export const AddItem = (_props: AddItemProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const isInvalid = name === '' || description === '' || price === '';

  const saveItem = () => {
    console.info('saveItem');
  };

  return null;
};
