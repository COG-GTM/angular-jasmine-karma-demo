import { useState, type ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import type { Item } from '../../../domain/item.model';

type FormValues = Item;
const fields: (keyof FormValues)[] = ['name', 'description', 'price'];

/** Angular `Validators.required` on a string control: only the empty string is invalid. */
const isInvalid = (values: FormValues) => fields.some((field) => values[field] === '');

/** Port of add-item.component (reactive form: name/description/price, all required). Not routed, as in Angular. */
export default function AddItemComponent() {
  const [values, setValues] = useState<FormValues>({ name: '', description: '', price: '' });

  const onChange = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
  };

  const saveItem = () => {
    console.info('saveItem');
  };

  return (
    <>
      <p>add-item works!</p>
      <form>
        {fields.map((field) => (
          <TextField
            key={field}
            variant="filled"
            label={field}
            placeholder={field}
            name={field}
            value={values[field]}
            onChange={onChange(field)}
          />
        ))}
        <Button
          disabled={isInvalid(values)}
          type="button"
          variant="contained"
          color="error"
          onClick={saveItem}
        >
          <Icon>save</Icon> Save
        </Button>
      </form>
    </>
  );
}
