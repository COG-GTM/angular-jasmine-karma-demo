import { useState } from 'react';

interface AddItemForm {
  name: string;
  description: string;
  price: string;
}

/**
 * Ported from AddItemComponent. Replicates the Angular reactive form where
 * name, description and price are all required and the Save button is disabled
 * until the form is valid.
 */
export function AddItem() {
  const [form, setForm] = useState<AddItemForm>({
    name: '',
    description: '',
    price: '',
  });

  const isInvalid =
    form.name.trim() === '' ||
    form.description.trim() === '' ||
    form.price.trim() === '';

  const handleChange = (field: keyof AddItemForm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const saveItem = () => {
    console.info('saveItem');
  };

  return (
    <form>
      <p>add-item works!</p>
      <div className="mat-form-field">
        <label htmlFor="name">name</label>
        <input
          id="name"
          placeholder="name"
          value={form.name}
          onChange={handleChange('name')}
        />
      </div>
      <div className="mat-form-field">
        <label htmlFor="description">description</label>
        <input
          id="description"
          placeholder="description"
          value={form.description}
          onChange={handleChange('description')}
        />
      </div>
      <div className="mat-form-field">
        <label htmlFor="price">price</label>
        <input
          id="price"
          placeholder="price"
          value={form.price}
          onChange={handleChange('price')}
        />
      </div>
      <button
        type="button"
        className="mat-raised-button mat-warn"
        disabled={isInvalid}
        onClick={saveItem}
      >
        <span className="material-icons">save</span> Save
      </button>
    </form>
  );
}

export default AddItem;
