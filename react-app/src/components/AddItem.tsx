import { useState } from 'react';
import type { Item } from '../types/item';

const emptyForm: Item = { name: '', description: '', price: '' };

export function AddItem() {
  const [form, setForm] = useState<Item>(emptyForm);

  const invalid = !form.name || !form.description || !form.price;

  const handleChange = (field: keyof Item) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const saveItem = () => {
    console.info('saveItem');
  };

  return (
    <div>
      <p>add-item works!</p>
      <form>
        {(['name', 'description', 'price'] as const).map((field) => (
          <div className="mat-form-field" key={field}>
            <label className="mat-label" htmlFor={`add-item-${field}`}>
              {field}
            </label>
            <input
              id={`add-item-${field}`}
              placeholder={field}
              value={form[field]}
              onChange={handleChange(field)}
            />
          </div>
        ))}
        <button className="mat-raised-button" type="button" disabled={invalid} onClick={saveItem}>
          <span className="material-icons">save</span> Save
        </button>
      </form>
    </div>
  );
}

export default AddItem;
