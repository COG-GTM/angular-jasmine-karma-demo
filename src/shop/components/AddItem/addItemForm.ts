import type { Item } from '../../domain/item.model';

// Pure port of the Angular reactive form in add-item.component.ts:
//   this.fb.group({ name: ['', Validators.required], description: [...], price: [...] })
// Keeping it framework-free makes `form.valid` / `control.hasError('required')` unit-testable.

export type AddItemField = keyof Item;

export type AddItemFormValues = Item;

export interface AddItemFieldErrors {
  required?: true;
}

export type AddItemFormErrors = Record<AddItemField, AddItemFieldErrors | null>;

export type AddItemTouched = Record<AddItemField, boolean>;

export const ADD_ITEM_FIELDS: readonly AddItemField[] = ['name', 'description', 'price'];

export const EMPTY_ADD_ITEM_FORM: AddItemFormValues = { name: '', description: '', price: '' };

export const UNTOUCHED_ADD_ITEM_FORM: AddItemTouched = {
  name: false,
  description: false,
  price: false,
};

// Same rule as Angular's Validators.required: only null/undefined/empty string fail
// (whitespace-only values are valid, exactly like the legacy form).
export function validateRequired(value: string | null | undefined): AddItemFieldErrors | null {
  return value == null || value.length === 0 ? { required: true } : null;
}

export function validateAddItemForm(values: AddItemFormValues): AddItemFormErrors {
  return {
    name: validateRequired(values.name),
    description: validateRequired(values.description),
    price: validateRequired(values.price),
  };
}

export function hasFieldError(
  values: AddItemFormValues,
  field: AddItemField,
  error: keyof AddItemFieldErrors,
): boolean {
  return validateAddItemForm(values)[field]?.[error] === true;
}

export function isFieldValid(values: AddItemFormValues, field: AddItemField): boolean {
  return validateAddItemForm(values)[field] === null;
}

export function isAddItemFormValid(values: AddItemFormValues): boolean {
  return ADD_ITEM_FIELDS.every((field) => isFieldValid(values, field));
}

// Angular Material's default ErrorStateMatcher: a field shows its error state (red label and
// underline) when it is invalid and touched (blurred). The legacy form is never submitted.
export function shouldShowFieldError(
  values: AddItemFormValues,
  touched: AddItemTouched,
  field: AddItemField,
): boolean {
  return touched[field] && !isFieldValid(values, field);
}
