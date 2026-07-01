import { useState } from 'react';

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
          <input className="mat-input-element" placeholder="name" />
        </div>
        <div className="mat-form-field" data-appearance="fill">
          <label className="mat-label">description</label>
          <input className="mat-input-element" placeholder="description" />
        </div>
        <div className="mat-form-field" data-appearance="fill">
          <label className="mat-label">price</label>
          <input className="mat-input-element" placeholder="price" />
        </div>
        <button type="button" className="mat-raised-button" data-color="warn">
          <span className="mat-icon">save</span> Save
        </button>
      </form>
    </>
  );
};
