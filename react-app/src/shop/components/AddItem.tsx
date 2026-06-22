import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

interface ItemForm {
  name: string;
  description: string;
  price: string;
}

export const AddItem = () => {
  const [form, setForm] = useState<ItemForm>({
    name: '',
    description: '',
    price: '',
  });

  const isInvalid = !form.name || !form.description || !form.price;

  const handleChange =
    (field: keyof ItemForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

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
        onChange={handleChange('name')}
      />
      <TextField
        variant="filled"
        label="description"
        placeholder="description"
        value={form.description}
        onChange={handleChange('description')}
      />
      <TextField
        variant="filled"
        label="price"
        placeholder="price"
        value={form.price}
        onChange={handleChange('price')}
      />
      <Button
        disabled={isInvalid}
        type="button"
        variant="contained"
        color="warning"
        onClick={saveItem}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </form>
  );
};
