import { ChangeEvent, useState } from 'react';

interface AddItemProps {}

export const AddItem = (_props: AddItemProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const isInvalid = name === '' || description === '' || price === '';

  const saveItem = () => {
    console.info('saveItem');
  };

  return (
    <>
      <p>add-item works!</p>
      <form>
        <div className="mat-form-field" data-appearance="fill">
          <label className="mat-label">name</label>
          <input
            className="mat-input-element"
            placeholder="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </div>
        <div className="mat-form-field" data-appearance="fill">
          <label className="mat-label">description</label>
          <input
            className="mat-input-element"
            placeholder="description"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          />
        </div>
        <div className="mat-form-field" data-appearance="fill">
          <label className="mat-label">price</label>
          <input
            className="mat-input-element"
            placeholder="price"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="mat-raised-button"
          data-color="warn"
          disabled={isInvalid}
          onClick={saveItem}
        >
          <span className="mat-icon">save</span> Save
        </button>
      </form>
    </>
  );
};
