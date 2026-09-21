import { useState } from 'react';

export interface AddItemForm {
  name: string;
  description: string;
  price: string;
}

const initialForm: AddItemForm = { name: '', description: '', price: '' };

export const AddItem = () => {
  const [form, setForm] = useState<AddItemForm>(initialForm);
  const isValid = form.name !== '' && form.description !== '' && form.price !== '';

  const updateField = (field: keyof AddItemForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveItem = () => {
    console.info('saveItem');
  };

  void updateField;
  void isValid;
  void saveItem;
  return null;
};
