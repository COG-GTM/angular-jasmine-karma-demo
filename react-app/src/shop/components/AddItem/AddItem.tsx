import { useState, type ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import type { Item } from '../../domain/item.model';
import {
  ADD_ITEM_FIELDS,
  EMPTY_ADD_ITEM_FORM,
  isAddItemFormValid,
  type AddItemField,
  type AddItemFormValues,
} from './addItemForm';

export interface AddItemProps {
  onSave?: (item: Item) => void;
}

// Port of add-item.component: a controlled form with three required fields.
// Parity: the Save button is type="button" and the <form> has no onSubmit, like the Angular template.
export function AddItem({ onSave }: AddItemProps) {
  const [values, setValues] = useState<AddItemFormValues>(EMPTY_ADD_ITEM_FORM);
  const valid = isAddItemFormValid(values);

  const handleChange = (field: AddItemField) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
  };

  const saveItem = () => {
    console.info('saveItem');
    onSave?.({ ...values });
  };

  return (
    <>
      <p>add-item works!</p>
      <form>
        {ADD_ITEM_FIELDS.map((field) => (
          <TextField
            key={field}
            variant="filled"
            label={field}
            placeholder={field}
            name={field}
            value={values[field]}
            onChange={handleChange(field)}
          />
        ))}
        <Button
          type="button"
          variant="contained"
          color="error"
          startIcon={<SaveIcon />}
          disabled={!valid}
          onClick={saveItem}
        >
          Save
        </Button>
      </form>
    </>
  );
}
