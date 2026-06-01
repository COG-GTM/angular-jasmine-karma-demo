import { useState } from 'react';

interface AddItemComponentProps {}

export const AddItemComponent: React.FC<AddItemComponentProps> = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const isFormInvalid = !name || !description || !price;

  const saveItem = () => {
    console.info('saveItem');
  };

  return (
    <div>
      <p>add-item works!</p>
      <form>
        <div className="mat-form-field">
          <label>name</label>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mat-form-field">
          <label>description</label>
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mat-form-field">
          <label>price</label>
          <input
            type="text"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button
          disabled={isFormInvalid}
          type="button"
          className="mat-raised-button mat-warn"
          onClick={saveItem}
        >
          <span className="mat-icon">save</span> Save
        </button>
      </form>
    </div>
  );
};
