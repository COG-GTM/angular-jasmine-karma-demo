import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

export function AddItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const isFormValid = name.trim() !== '' && description.trim() !== '' && price.trim() !== '';

  const handleSave = () => {
    console.info('saveItem');
  };

  return (
    <div>
      <p>add-item works!</p>
      <form>
        <TextField
          label="name"
          placeholder="name"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ display: 'block', marginBottom: 1 }}
        />
        <TextField
          label="description"
          placeholder="description"
          variant="filled"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          sx={{ display: 'block', marginBottom: 1 }}
        />
        <TextField
          label="price"
          placeholder="price"
          variant="filled"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          sx={{ display: 'block', marginBottom: 1 }}
        />
        <Button
          disabled={!isFormValid}
          variant="contained"
          color="warning"
          onClick={handleSave}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
