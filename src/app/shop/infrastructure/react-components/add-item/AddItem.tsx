import './AddItem.css';
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

  const fields: (keyof AddItemForm)[] = ['name', 'description', 'price'];

  return (
    <>
      <p>add-item works!</p>
      <form>
        {fields.map((field) => (
          <div key={field} className="mat-form-field mat-form-field-appearance-fill">
            <label className="mat-form-field-label" htmlFor={`add-item-${field}`}>
              {field}
            </label>
            <input
              id={`add-item-${field}`}
              className="mat-input-element"
              placeholder={field}
              value={form[field]}
              onChange={(e) => updateField(field, e.target.value)}
            />
          </div>
        ))}
        <button
          disabled={!isValid}
          type="button"
          className="mat-raised-button mat-warn"
          onClick={saveItem}
        >
          <span className="material-icons">save</span> Save
        </button>
      </form>
    </>
  );
};
