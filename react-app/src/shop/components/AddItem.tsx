import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import './AddItem.css';

export default function AddItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const isValid = name !== '' && description !== '' && price !== '';

  const saveItem = () => {
    console.info('saveItem');
  };

  return (
    <>
      <p>add-item works!</p>
      <form className="add-item-form">
        <TextField
          variant="filled"
          label="name"
          placeholder="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="filled"
          label="description"
          placeholder="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          variant="filled"
          label="price"
          placeholder="price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button
          type="button"
          variant="contained"
          color="error"
          startIcon={<SaveIcon />}
          disabled={!isValid}
          onClick={saveItem}
        >
          Save
        </Button>
      </form>
    </>
  );
}
