import { useState } from 'react';
import { emptyForm, isFormValid, type AddItemForm } from '../utils/addItemForm';

export default function AddItem() {
  const [form, setForm] = useState<AddItemForm>(emptyForm);

  const handleChange =
    (field: keyof AddItemForm) => (event: React.ChangeEvent<HTMLInputElement>) =>
      setForm((current) => ({ ...current, [field]: event.target.value }));

  const saveItem = () => {
    console.info('saveItem');
  };

  return (
    <>
      <p>add-item works!</p>
      <form>
        <div className="mat-form-field">
          <label className="mat-label" htmlFor="name">
            name
          </label>
          <input
            id="name"
            name="name"
            placeholder="name"
            value={form.name}
            onChange={handleChange('name')}
          />
        </div>
        <div className="mat-form-field">
          <label className="mat-label" htmlFor="description">
            description
          </label>
          <input
            id="description"
            name="description"
            placeholder="description"
            value={form.description}
            onChange={handleChange('description')}
          />
        </div>
        <div className="mat-form-field">
          <label className="mat-label" htmlFor="price">
            price
          </label>
          <input
            id="price"
            name="price"
            placeholder="price"
            value={form.price}
            onChange={handleChange('price')}
          />
        </div>
        <button
          type="button"
          className="mat-raised-button"
          disabled={!isFormValid(form)}
          onClick={saveItem}
        >
          <span className="material-icons">save</span> Save
        </button>
      </form>
    </>
  );
}
