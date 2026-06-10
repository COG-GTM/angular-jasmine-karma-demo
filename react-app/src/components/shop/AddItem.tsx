import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

// Ported from add-item.component.ts / .html
// The Angular ReactiveForm (FormBuilder + Validators.required) becomes a
// controlled React form. All three fields are required, mirroring the original.
interface FormFields {
  name: string;
  description: string;
  price: string;
}

const REQUIRED_FIELDS: (keyof FormFields)[] = ['name', 'description', 'price'];

export const isFormValid = (form: FormFields): boolean =>
  REQUIRED_FIELDS.every((field) => form[field].trim() !== '');

export const AddItem = () => {
  const [form, setForm] = useState<FormFields>({
    name: '',
    description: '',
    price: '',
  });

  const handleChange =
    (field: keyof FormFields) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const saveItem = () => {
    console.info('saveItem');
  };

  const valid = isFormValid(form);

  return (
    <>
      <p>add-item works!</p>
      <form>
        <TextField
          variant="filled"
          label="name"
          placeholder="name"
          value={form.name}
          onChange={handleChange('name')}
          inputProps={{ 'aria-label': 'name' }}
        />
        <TextField
          variant="filled"
          label="description"
          placeholder="description"
          value={form.description}
          onChange={handleChange('description')}
          inputProps={{ 'aria-label': 'description' }}
        />
        <TextField
          variant="filled"
          label="price"
          placeholder="price"
          value={form.price}
          onChange={handleChange('price')}
          inputProps={{ 'aria-label': 'price' }}
        />
        <Button
          type="button"
          variant="contained"
          color="warning"
          disabled={!valid}
          startIcon={<SaveIcon />}
          onClick={saveItem}
        >
          Save
        </Button>
      </form>
    </>
  );
};
