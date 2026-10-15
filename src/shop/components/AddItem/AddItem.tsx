import { useState } from 'react';
import type { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import type { Item } from '../../domain/item.model';

export interface AddItemProps {
  onSave?: (item: Item) => void;
}

export default function AddItem({ onSave }: AddItemProps) {
  const [values, setValues] = useState<Item>({ name: '', description: '', price: '' });

  const invalid = values.name === '' || values.description === '' || values.price === '';

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const saveItem = () => {
    console.info('saveItem');
    onSave?.(values);
  };

  return (
    <>
      <p>add-item works!</p>
      <form>
        <TextField
          variant="filled"
          required
          label="name"
          placeholder="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <TextField
          variant="filled"
          required
          label="description"
          placeholder="description"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
        <TextField
          variant="filled"
          required
          label="price"
          placeholder="price"
          name="price"
          value={values.price}
          onChange={handleChange}
        />
        <Button
          type="button"
          variant="contained"
          color="error"
          disabled={invalid}
          startIcon={<SaveIcon />}
          onClick={saveItem}
        >
          Save
        </Button>
      </form>
    </>
  );
}
