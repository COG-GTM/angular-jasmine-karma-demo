import { useState } from "react";
import "./AddItem.scss";

import type { AddItemFormState } from "./addItemForm";
import { EMPTY_FORM, isFormValid } from "./addItemForm";

export function AddItem() {
  const [form, setForm] = useState<AddItemFormState>(EMPTY_FORM);

  const updateField = (field: keyof AddItemFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const saveItem = () => {
    console.info("saveItem");
  };

  const valid = isFormValid(form);

  return (
    <div className="add-item">
      <p>add-item works!</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mat-form-field">
          <label htmlFor="add-item-name">name</label>
          <input
            id="add-item-name"
            type="text"
            placeholder="name"
            value={form.name}
            onChange={updateField("name")}
          />
        </div>
        <div className="mat-form-field">
          <label htmlFor="add-item-description">description</label>
          <input
            id="add-item-description"
            type="text"
            placeholder="description"
            value={form.description}
            onChange={updateField("description")}
          />
        </div>
        <div className="mat-form-field">
          <label htmlFor="add-item-price">price</label>
          <input
            id="add-item-price"
            type="text"
            placeholder="price"
            value={form.price}
            onChange={updateField("price")}
          />
        </div>
        <button
          type="button"
          className="mat-raised-button mat-warn"
          disabled={!valid}
          onClick={saveItem}
        >
          <span className="material-icons">save</span> Save
        </button>
      </form>
    </div>
  );
}

export default AddItem;
