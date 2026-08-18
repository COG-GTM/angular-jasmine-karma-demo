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
  const [dirty, setDirty] = useState<Record<Field, boolean>>({
    name: false,
    description: false,
    price: false,
  });

  // Matches Angular's Validators.required: only an empty value is invalid, a
  // whitespace-only value is not.
  const isFieldInvalid = (field: Field): boolean => values[field].length === 0;
  const isFormInvalid = FIELDS.some(isFieldInvalid);
  // Angular Material shows the error state once the control is invalid and has
  // been touched or edited.
  const showsError = (field: Field): boolean =>
    isFieldInvalid(field) && (touched[field] || dirty[field]);

  const saveItem = (): void => {
    console.info('saveItem');
  };

  return (
    <>
      <p>add-item works!</p>
      {/* Angular's FormGroupDirective swallows native submits; do the same here. */}
      <form className="add-item-form" onSubmit={(event) => event.preventDefault()}>
        {FIELDS.map((field) => (
          <div
            key={field}
            className={
              'mat-form-field mat-form-field-appearance-fill' +
              (showsError(field) ? ' mat-form-field-invalid' : '')
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
                  onChange={(event) => {
                    setValues((current) => ({ ...current, [field]: event.target.value }));
                    setDirty((current) => ({ ...current, [field]: true }));
                  }}
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
