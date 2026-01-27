import React, { useState, useCallback, useMemo } from 'react';

interface FormState {
  name: string;
  description: string;
  price: string;
}

interface FormErrors {
  name: boolean;
  description: boolean;
  price: boolean;
}

export interface AddItemComponentProps {
  onSaveItem?: (item: FormState) => void;
}

export const AddItemComponent: React.FC<AddItemComponentProps> = ({ onSaveItem }) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    description: '',
    price: '',
  });

  const [touched, setTouched] = useState<FormErrors>({
    name: false,
    description: false,
    price: false,
  });

  const errors = useMemo<FormErrors>(() => ({
    name: form.name.trim() === '',
    description: form.description.trim() === '',
    price: form.price.trim() === '',
  }), [form]);

  const isFormValid = useMemo(() => {
    return !errors.name && !errors.description && !errors.price;
  }, [errors]);

  const handleChange = useCallback((field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  }, []);

  const handleBlur = useCallback((field: keyof FormState) => () => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));
  }, []);

  const saveItem = useCallback(() => {
    console.info('saveItem');
    if (onSaveItem && isFormValid) {
      onSaveItem(form);
    }
  }, [form, isFormValid, onSaveItem]);

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
            onBlur={handleBlur('name')}
          />
          {touched.name && errors.name && (
            <span className="error">Name is required</span>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="description">description</label>
          <input
            id="description"
            type="text"
            placeholder="description"
            value={form.description}
            onChange={handleChange('description')}
            onBlur={handleBlur('description')}
          />
          {touched.description && errors.description && (
            <span className="error">Description is required</span>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="price">price</label>
          <input
            id="price"
            type="text"
            placeholder="price"
            value={form.price}
            onChange={handleChange('price')}
            onBlur={handleBlur('price')}
          />
          {touched.price && errors.price && (
            <span className="error">Price is required</span>
          )}
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
