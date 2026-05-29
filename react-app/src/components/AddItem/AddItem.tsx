import { useState } from 'react';
import './AddItem.scss';

interface FormState {
  name: string;
  description: string;
  price: string;
}

function isFormValid(form: FormState): boolean {
  return form.name.trim() !== '' && form.description.trim() !== '' && form.price.trim() !== '';
}

export function AddItem() {
  const [form, setForm] = useState<FormState>({ name: '', description: '', price: '' });

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const saveItem = () => {
    console.info('saveItem');
  };

  const valid = isFormValid(form);

  return (
    <div className="add-item">
      <p>add-item works!</p>
      <form onSubmit={e => e.preventDefault()}>
        <div className="form-field">
          <label htmlFor="name">name</label>
          <input
            id="name"
            placeholder="name"
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">description</label>
          <input
            id="description"
            placeholder="description"
            value={form.description}
            onChange={e => handleChange('description', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="price">price</label>
          <input
            id="price"
            placeholder="price"
            value={form.price}
            onChange={e => handleChange('price', e.target.value)}
          />
        </div>
        <button
          disabled={!valid}
          type="button"
          className="save-btn"
          onClick={saveItem}
        >
          <span className="material-icons">save</span> Save
        </button>
      </form>
    </div>
  );
}

export { isFormValid };
