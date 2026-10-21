import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddItem } from './AddItem';
import {
  EMPTY_ADD_ITEM_FORM,
  hasFieldError,
  isAddItemFormValid,
  isFieldValid,
  shouldShowFieldError,
  UNTOUCHED_ADD_ITEM_FORM,
  type AddItemFormValues,
} from './addItemForm';

// Port of add-item.component.spec.ts ("testing form validation").
// The Angular spec set FormControl values directly (component.form.controls[...].setValue).
// In React the validation rules live in pure functions (addItemForm.ts), so the form-model
// cases call those functions, and the DOM cases type into the real inputs with user-event.

const filled: AddItemFormValues = { name: 'foo', description: 'bar', price: '33' };

function setup() {
  const onSave = vi.fn();
  // userEvent.setup() simulates full user interactions (focus, keydown, input, keyup...)
  const user = userEvent.setup();
  render(<AddItem onSave={onSave} />);
  return { user, onSave };
}

async function fillForm(user: ReturnType<typeof userEvent.setup>, values: AddItemFormValues) {
  await user.type(screen.getByLabelText('name'), values.name);
  await user.type(screen.getByLabelText('description'), values.description);
  await user.type(screen.getByLabelText('price'), values.price);
}

describe('AddItem: testing form validation', () => {
  it('should create', () => {
    // Arrange / Act
    setup();

    // Assert
    expect(screen.getByText('add-item works!')).toBeInTheDocument();
    expect(screen.getByLabelText('name')).toHaveAttribute('placeholder', 'name');
    expect(screen.getByLabelText('description')).toHaveAttribute('placeholder', 'description');
    expect(screen.getByLabelText('price')).toHaveAttribute('placeholder', 'price');
    expect(screen.getByRole('button', { name: /save/i })).toHaveAttribute('type', 'button');
  });

  it('form should be invalid when empty', () => {
    // Arrange
    const values: AddItemFormValues = { name: '', description: '', price: '' };

    // Act / Assert
    expect(isAddItemFormValid(values)).toBe(false);
  });

  it('form should be valid when all fields are filled', () => {
    expect(isAddItemFormValid(filled)).toBe(true);
  });

  it('form should be invalid when only name is filled', () => {
    expect(isAddItemFormValid({ name: 'foo', description: '', price: '' })).toBe(false);
  });

  it('form should be invalid when only description is filled', () => {
    expect(isAddItemFormValid({ name: '', description: 'bar', price: '' })).toBe(false);
  });

  it('form should be invalid when only price is filled', () => {
    expect(isAddItemFormValid({ name: '', description: '', price: '33' })).toBe(false);
  });

  it('name field should be required', () => {
    // Arrange: the initial form state, like the freshly built FormGroup
    const values = { ...EMPTY_ADD_ITEM_FORM };

    // Assert
    expect(isFieldValid(values, 'name')).toBe(false);
    expect(hasFieldError({ ...values, name: '' }, 'name', 'required')).toBe(true);
  });

  it('description field should be required', () => {
    const values = { ...EMPTY_ADD_ITEM_FORM };

    expect(isFieldValid(values, 'description')).toBe(false);
    expect(hasFieldError({ ...values, description: '' }, 'description', 'required')).toBe(true);
  });

  it('price field should be required', () => {
    const values = { ...EMPTY_ADD_ITEM_FORM };

    expect(isFieldValid(values, 'price')).toBe(false);
    expect(hasFieldError({ ...values, price: '' }, 'price', 'required')).toBe(true);
  });

  it('button save should not call saveItem when form is invalid', () => {
    // Arrange: spies intercept calls so we can assert on them (Jasmine spyOn -> vi.spyOn / vi.fn)
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    const { onSave } = setup();
    const saveButton = screen.getByRole('button', { name: /save/i });

    // Act: native click, like nativeElement.click() in the Angular spec
    saveButton.click();

    // Assert: remember, the button is disabled while the form is invalid
    expect(info).toHaveBeenCalledTimes(0);
    expect(onSave).toHaveBeenCalledTimes(0);
  });

  it('button save should call saveItem when form is valid', async () => {
    // Arrange
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    const { user, onSave } = setup();
    await fillForm(user, filled);

    // Act
    await user.click(screen.getByRole('button', { name: /save/i }));

    // Assert
    expect(info).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(filled);
  });

  it('saveItem method should log to console', async () => {
    // Arrange
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<AddItem />); // onSave is optional
    await fillForm(user, filled);

    // Act
    await user.click(screen.getByRole('button', { name: /save/i }));

    // Assert
    expect(info).toHaveBeenCalledWith('saveItem');
  });

  it('button should be disabled when form is invalid', () => {
    setup();

    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('button should be enabled when form is valid', async () => {
    // Arrange
    const { user } = setup();

    // Act
    await fillForm(user, filled);

    // Assert
    expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
  });

  it('button should be disabled again when a required field is cleared', async () => {
    // Arrange
    const { user } = setup();
    await fillForm(user, filled);

    // Act
    await user.clear(screen.getByLabelText('price'));

    // Assert
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('whitespace-only values count as filled, like Validators.required', () => {
    expect(isAddItemFormValid({ name: ' ', description: ' ', price: ' ' })).toBe(true);
  });

  it('shows the error state only once an invalid field has been touched', () => {
    // Arrange
    const touchedName = { ...UNTOUCHED_ADD_ITEM_FORM, name: true };

    // Act / Assert: mirrors Angular's ErrorStateMatcher (invalid && touched)
    expect(shouldShowFieldError(EMPTY_ADD_ITEM_FORM, UNTOUCHED_ADD_ITEM_FORM, 'name')).toBe(false);
    expect(shouldShowFieldError(EMPTY_ADD_ITEM_FORM, touchedName, 'name')).toBe(true);
    expect(shouldShowFieldError(filled, touchedName, 'name')).toBe(false);
  });

  it('marks a cleared field as invalid after blur, like mat-form-field', async () => {
    // Arrange
    const { user } = setup();
    const price = screen.getByLabelText('price');
    expect(price).toHaveAttribute('aria-invalid', 'false');

    // Act: type, clear, then move focus away (blur marks the control as touched)
    await user.type(price, '33');
    await user.clear(price);
    await user.tab();

    // Assert
    expect(price).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('name')).toHaveAttribute('aria-invalid', 'false');
  });

  it('a submit event is cancelled and does not save, like FormGroupDirective', async () => {
    // Arrange: a valid form, so a save would be allowed if submit triggered it
    const { user, onSave } = setup();
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    await fillForm(user, filled);
    const form = screen.getByLabelText('name').closest('form')!;

    // Act: fireEvent-style dispatch; requestSubmit() would also reach the same handler
    const event = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(event);

    // Assert: default (navigation) prevented, and saveItem was not called
    expect(event.defaultPrevented).toBe(true);
    expect(onSave).not.toHaveBeenCalled();
    expect(info).not.toHaveBeenCalledWith('saveItem');
  });
});
