import React, { useState } from 'react';
import './AddItem.css';

interface AddItemFormState {
  name: string;
  description: string;
  price: string;
}

export const AddItem: React.FC = () => {
  const [form, setForm] = useState<AddItemFormState>({
    name: '',
    description: '',
    price: '',
  });

  const isFormValid =
    form.name.trim() !== '' &&
    form.description.trim() !== '' &&
    form.price.trim() !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveItem = () => {
    console.info('saveItem');
  };

  return (
    <div className="add-item-container">
      <p>add-item works!</p>
      <form>
        <div className="mat-form-field">
          <label htmlFor="name">name</label>
          <input
            id="name"
            name="name"
            placeholder="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="mat-form-field">
          <label htmlFor="description">description</label>
          <input
            id="description"
            name="description"
            placeholder="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="mat-form-field">
          <label htmlFor="price">price</label>
          <input
            id="price"
            name="price"
            placeholder="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          disabled={!isFormValid}
          onClick={saveItem}
          className="save-button"
        >
          Save
        </button>
      </form>
    </div>
  );
};
