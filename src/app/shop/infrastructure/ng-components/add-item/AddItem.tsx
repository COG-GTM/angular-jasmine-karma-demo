import React, { useState, useCallback } from 'react';

interface AddItemFormState {
  name: string;
  description: string;
  price: string;
}

interface AddItemFormErrors {
  name: boolean;
  description: boolean;
  price: boolean;
}

export const AddItem: React.FC = () => {
  const [form, setForm] = useState<AddItemFormState>({
    name: '',
    description: '',
    price: '',
  });

  const [touched, setTouched] = useState<AddItemFormErrors>({
    name: false,
    description: false,
    price: false,
  });

  const isFieldInvalid = (field: keyof AddItemFormState): boolean => {
    return form[field].trim() === '';
  };

  const isFormValid = (): boolean => {
    return (
      form.name.trim() !== '' &&
      form.description.trim() !== '' &&
      form.price.trim() !== ''
    );
  };

  const handleChange = useCallback(
    (field: keyof AddItemFormState) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
      },
    []
  );

  const handleBlur = useCallback(
    (field: keyof AddItemFormState) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    []
  );

  const saveItem = useCallback((): void => {
    console.info('saveItem');
  }, []);

  return (
    <div>
      <p>add-item works!</p>
      <form>
        <div className="mat-form-field">
          <label htmlFor="name">name</label>
          <input
            id="name"
            type="text"
            placeholder="name"
            value={form.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
          />
          {touched.name && isFieldInvalid('name') && (
            <span className="error">name is required</span>
          )}
        </div>

        <div className="mat-form-field">
          <label htmlFor="description">description</label>
          <input
            id="description"
            type="text"
            placeholder="description"
            value={form.description}
            onChange={handleChange('description')}
            onBlur={handleBlur('description')}
          />
          {touched.description && isFieldInvalid('description') && (
            <span className="error">description is required</span>
          )}
        </div>

        <div className="mat-form-field">
          <label htmlFor="price">price</label>
          <input
            id="price"
            type="text"
            placeholder="price"
            value={form.price}
            onChange={handleChange('price')}
            onBlur={handleBlur('price')}
          />
          {touched.price && isFieldInvalid('price') && (
            <span className="error">price is required</span>
          )}
        </div>

        <button
          disabled={!isFormValid()}
          type="button"
          onClick={saveItem}
        >
          💾 Save
        </button>
      </form>
    </div>
  );
};
