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

  return (
    <div>
      <p>add-item works!</p>
      <form>
        <div className="form-field">
          <label htmlFor="name">name</label>
          <input
            id="name"
            type="text"
            placeholder="name"
            value={form.name}
            onChange={handleChange('name')}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">description</label>
          <input
            id="description"
            type="text"
            placeholder="description"
            value={form.description}
            onChange={handleChange('description')}
          />
        </div>
        <div className="form-field">
          <label htmlFor="price">price</label>
          <input
            id="price"
            type="text"
            placeholder="price"
            value={form.price}
            onChange={handleChange('price')}
          />
        </div>
        <button
          type="button"
          disabled={!isFormValid}
          onClick={saveItem}
        >
          Save
        </button>
      </form>
    </div>
  );
};
