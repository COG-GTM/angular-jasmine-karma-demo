import { useState } from 'react';

interface FormState {
  name: string;
  description: string;
  price: string;
}

export const AddItemComponent = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    description: '',
    price: '',
  });

  const isFormValid = form.name !== '' && form.description !== '' && form.price !== '';

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const saveItem = () => {
    console.info('saveItem');
  };

  return null;
};
