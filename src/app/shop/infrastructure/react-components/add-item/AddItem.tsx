import { useState } from 'react';
import styles from './AddItem.module.scss';

export interface AddItemFormValues {
  name: string;
  description: string;
  price: string;
}

export interface AddItemProps {
  onSave?: (values: AddItemFormValues) => void;
}

const INITIAL_VALUES: AddItemFormValues = {
  name: '',
  description: '',
  price: '',
};

// Mirrors Angular `Validators.required` on each control: non-empty string.
const isRequiredValid = (value: string): boolean => value.trim().length > 0;

export const AddItem = (props: AddItemProps): JSX.Element => {
  // ngOnInit -> formInit: initialize the form values at mount.
  const [form, setForm] = useState<AddItemFormValues>(INITIAL_VALUES);

  const isFormValid =
    isRequiredValid(form.name) &&
    isRequiredValid(form.description) &&
    isRequiredValid(form.price);

  const handleChange = (field: keyof AddItemFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const saveItem = (): void => {
    console.info('saveItem');
    props.onSave?.(form);
  };

  // Template translation of `add-item.component.html`.
  // TODO: replace plain inputs/buttons with a React Material (or other
  // design-system) equivalent when the host app picks one.
  return (
    <form className={styles.form}>
      <p>add-item works!</p>

      <div className={styles.field}>
        <label htmlFor="add-item-name">name</label>
        <input
          id="add-item-name"
          type="text"
          placeholder="name"
          value={form.name}
          onChange={handleChange('name')}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="add-item-description">description</label>
        <input
          id="add-item-description"
          type="text"
          placeholder="description"
          value={form.description}
          onChange={handleChange('description')}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="add-item-price">price</label>
        <input
          id="add-item-price"
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
  );
};
