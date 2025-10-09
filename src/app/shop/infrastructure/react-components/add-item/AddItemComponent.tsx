import { useState } from 'react';

interface AddItemComponentProps {}

export const AddItemComponent: React.FC<AddItemComponentProps> = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const isFormInvalid = !name || !description || !price;

  const saveItem = () => {
    console.info('saveItem');
  };

  return null;
};
