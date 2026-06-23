import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import './add-item.scss';

interface AddItemForm {
  name: string;
  description: string;
  price: string;
}

// Mirrors AddItemComponent. Not wired into routing in the Angular app either,
// but ported to preserve the component structure.
export default function AddItem() {
  const [form, setForm] = useState<AddItemForm>({
    name: '',
    description: '',
    price: '',
  });

  const isInvalid = !form.name || !form.description || !form.price;

  const update =
    (field: keyof AddItemForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const saveItem = () => {
    console.info('saveItem');
  };

  return (
    <form>
      <p>add-item works!</p>
      <TextField
        variant="filled"
        label="name"
        placeholder="name"
        value={form.name}
        onChange={update('name')}
      />
      <TextField
        variant="filled"
        label="description"
        placeholder="description"
        value={form.description}
        onChange={update('description')}
      />
      <TextField
        variant="filled"
        label="price"
        placeholder="price"
        value={form.price}
        onChange={update('price')}
      />
      <Button
        type="button"
        variant="contained"
        color="error"
        disabled={isInvalid}
        startIcon={<SaveIcon />}
        onClick={saveItem}
      >
        Save
      </Button>
    </form>
  );
}
