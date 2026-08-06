import type { FC } from 'react';
import { useState } from 'react';

export interface AddItemProps {}

interface ItemFormState {
  name: string;
  description: string;
  price: string;
}

const initialFormState: ItemFormState = {
  name: '',
  description: '',
  price: '',
};

const AddItem: FC<AddItemProps> = () => {
  const [form, setForm] = useState<ItemFormState>(initialFormState);
  const isFormValid = Object.values(form).every((value) => value.trim() !== '');

  const handleChange = (field: keyof ItemFormState, value: string): void => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const saveItem = (): void => {
    console.info('saveItem');
  };

  return (
    <>
      <p>add-item works!</p>
      <form>
        <label htmlFor="item-name">name</label>
        <input
          id="item-name"
          name="name"
          placeholder="name"
          required
          value={form.name}
          onChange={(event) => handleChange('name', event.target.value)}
        />

        <label htmlFor="item-description">description</label>
        <input
          id="item-description"
          name="description"
          placeholder="description"
          required
          value={form.description}
          onChange={(event) => handleChange('description', event.target.value)}
        />

        <label htmlFor="item-price">price</label>
        <input
          id="item-price"
          name="price"
          placeholder="price"
          required
          value={form.price}
          onChange={(event) => handleChange('price', event.target.value)}
        />

        <button type="button" disabled={!isFormValid} onClick={saveItem}>
          Save
        </button>
      </form>
    </>
  );
};

export default AddItem;
