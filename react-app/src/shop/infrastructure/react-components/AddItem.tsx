import { useState } from 'react';
import type { Item } from '../../domain/item.model';
import './add-item.scss';

type Field = keyof Item;

const FIELDS: Field[] = ['name', 'description', 'price'];

// Port of AddItemComponent's reactive form: every control is required and the
// Save button stays disabled while the form is invalid.
export function AddItem() {
  const [values, setValues] = useState<Item>({ name: '', description: '', price: '' });
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    name: false,
    description: false,
    price: false,
  });

  const isFieldInvalid = (field: Field): boolean => values[field].trim().length === 0;
  const isFormInvalid = FIELDS.some(isFieldInvalid);

  const saveItem = (): void => {
    console.info('saveItem');
  };

  return (
    <>
      <p>add-item works!</p>
      <form className="add-item-form">
        {FIELDS.map((field) => (
          <div
            key={field}
            className={
              'mat-form-field mat-form-field-appearance-fill' +
              (touched[field] && isFieldInvalid(field) ? ' mat-form-field-invalid' : '')
            }
          >
            <div className="mat-form-field-flex">
              <label className="mat-form-field-label" htmlFor={`add-item-${field}`}>
                {field}
              </label>
              <div className="mat-form-field-infix">
                <input
                  id={`add-item-${field}`}
                  name={field}
                  placeholder={field}
                  value={values[field]}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [field]: event.target.value }))
                  }
                  onBlur={() => setTouched((current) => ({ ...current, [field]: true }))}
                />
              </div>
            </div>
            <div className="mat-form-field-underline" />
          </div>
        ))}
        <button
          type="button"
          disabled={isFormInvalid}
          className="mat-raised-button mat-button-base mat-warn"
          onClick={saveItem}
        >
          <span className="mat-button-wrapper">
            <span className="mat-icon material-icons" aria-hidden="true">
              save
            </span>{' '}
            Save
          </span>
        </button>
      </form>
    </>
  );
}
