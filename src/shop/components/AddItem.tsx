import { useState, type FormEvent } from "react";

/**
 * AddItem: React port of the Angular `AddItemComponent`.
 *
 * Angular patterns replaced:
 *   - `FormBuilder` / `FormGroup` / `Validators.required` → React controlled
 *     inputs managed by `useState`.
 *   - `form.valid` → derived `isValid` boolean from state.
 *   - `[disabled]="form.invalid"` → disabled prop on the submit button.
 *   - `(click)="saveItem()"` → `onClick` prop that calls `saveItem()`.
 */
export interface AddItemFormValues {
  name: string;
  description: string;
  price: string;
}

export interface AddItemProps {
  /**
   * Optional handler invoked when the user clicks "Save" with a valid form.
   * The Angular version just logged "saveItem" to the console; we expose the
   * callback here so tests can verify it was invoked.
   */
  onSave?: (values: AddItemFormValues) => void;
}

export function AddItem({ onSave }: AddItemProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Mirrors `Validators.required` on all three controls: every field is
  // required, so the form is valid only when none of them are empty.
  const isValid =
    name.trim() !== "" && description.trim() !== "" && price.trim() !== "";

  const saveItem = () => {
    // eslint-disable-next-line no-console
    console.info("saveItem");
    onSave?.({ name, description, price });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValid) {
      saveItem();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>add-item works!</p>
      <label>
        name
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-label="name"
        />
      </label>
      <label>
        description
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          aria-label="description"
        />
      </label>
      <label>
        price
        <input
          type="text"
          placeholder="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          aria-label="price"
        />
      </label>
      <button
        type="button"
        className="save-button"
        disabled={!isValid}
        onClick={saveItem}
      >
        Save
      </button>
    </form>
  );
}

export default AddItem;
