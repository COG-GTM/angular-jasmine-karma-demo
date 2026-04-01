import React, { useState, useEffect, useCallback } from 'react';

/**
 * Interface representing the form state for AddItemComponent.
 * Mirrors the Angular reactive form fields: name, description, price.
 */
interface AddItemFormState {
  name: string;
  description: string;
  price: string;
}

/**
 * Interface representing the validation state for each form field.
 */
interface AddItemFormValidity {
  name: boolean;
  description: boolean;
  price: boolean;
}

/**
 * Props interface for the AddItemComponent.
 * The Angular version had no @Input() or @Output() bindings,
 * but we define an optional onSaveItem callback to allow parent
 * components to hook into the save action.
 */
interface AddItemComponentProps {
  /** Optional callback invoked when the save button is clicked (mirrors Angular saveItem()) */
  onSaveItem?: (item: AddItemFormState) => void;
}

/**
 * React equivalent of the Angular AddItemComponent.
 *
 * Angular version used:
 * - FormBuilder + FormGroup with Validators.required on name, description, price
 * - ngOnInit to call formInit()
 * - saveItem() placeholder logging to console
 *
 * React version uses:
 * - useState for form state management (replaces FormGroup)
 * - useEffect for initialization (replaces ngOnInit)
 * - Validation logic inline (replaces Validators.required)
 */
export const AddItemComponent: React.FC<AddItemComponentProps> = ({ onSaveItem }) => {
  // Form state — replaces Angular's FormGroup created by FormBuilder
  const [form, setForm] = useState<AddItemFormState>({
    name: '',
    description: '',
    price: '',
  });

  // Track whether each field has been touched for validation display
  const [touched, setTouched] = useState<AddItemFormValidity>({
    name: false,
    description: false,
    price: false,
  });

  /**
   * formInit — replaces Angular's formInit() called in ngOnInit.
   * In Angular, this created the FormGroup with Validators.required.
   * In React, the initial state is set via useState above; this
   * useEffect mirrors the ngOnInit lifecycle hook.
   */
  useEffect(() => {
    // Form is initialized via useState defaults above.
    // This useEffect mirrors ngOnInit → formInit() lifecycle.
  }, []);

  /**
   * Validates that all required fields are non-empty.
   * Replaces Angular's Validators.required on each FormControl.
   */
  const isFormValid = useCallback((): boolean => {
    return form.name.trim() !== '' && form.description.trim() !== '' && form.price.trim() !== '';
  }, [form]);

  /**
   * Handles input changes for form fields.
   * Replaces Angular's formControlName two-way binding.
   */
  const handleChange = (field: keyof AddItemFormState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  /**
   * Handles input blur to mark fields as touched.
   */
  const handleBlur = (field: keyof AddItemFormState) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  /**
   * saveItem — mirrors the Angular saveItem() method.
   * In Angular, this was a placeholder that logged to console.
   * Here we preserve that behavior and also invoke the optional callback.
   */
  const saveItem = (): void => {
    console.info('saveItem');
    if (onSaveItem) {
      onSaveItem(form);
    }
  };

  return (
    <div>
      <p>add-item works!</p>
      {/* TODO: Replace HTML form elements with Material UI equivalents (Angular used mat-form-field, mat-label, matInput, mat-raised-button, mat-icon) */}
      <form>
        <div className="mat-form-field">
          <label htmlFor="add-item-name">name</label>
          <input
            id="add-item-name"
            type="text"
            placeholder="name"
            value={form.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
          />
          {touched.name && form.name.trim() === '' && (
            <span className="validation-error">Name is required</span>
          )}
        </div>
        <div className="mat-form-field">
          <label htmlFor="add-item-description">description</label>
          <input
            id="add-item-description"
            type="text"
            placeholder="description"
            value={form.description}
            onChange={handleChange('description')}
            onBlur={handleBlur('description')}
          />
          {touched.description && form.description.trim() === '' && (
            <span className="validation-error">Description is required</span>
          )}
        </div>
        <div className="mat-form-field">
          <label htmlFor="add-item-price">price</label>
          <input
            id="add-item-price"
            type="text"
            placeholder="price"
            value={form.price}
            onChange={handleChange('price')}
            onBlur={handleBlur('price')}
          />
          {touched.price && form.price.trim() === '' && (
            <span className="validation-error">Price is required</span>
          )}
        </div>
        <button
          disabled={!isFormValid()}
          type="button"
          onClick={saveItem}
        >
          {/* TODO: Replace with Material UI icon equivalent (Angular used mat-icon with "save") */}
          Save
        </button>
      </form>
    </div>
  );
};
