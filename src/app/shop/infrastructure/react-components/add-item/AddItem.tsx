import { useState } from 'react';

export interface AddItemFormValues {
  name: string;
  description: string;
  price: string;
}

export interface AddItemProps {
  onSave?: (values: AddItemFormValues) => void;
}

const INITIAL_VALUES: AddItemFormValues = {
  name: '',
  description: '',
  price: '',
};

// Mirrors Angular `Validators.required` on each control: non-empty string.
const isRequiredValid = (value: string): boolean => value.trim().length > 0;

export const AddItem = (props: AddItemProps): JSX.Element => {
  // ngOnInit -> formInit: initialize the form values at mount.
  const [form, setForm] = useState<AddItemFormValues>(INITIAL_VALUES);

  const isFormValid =
    isRequiredValid(form.name) &&
    isRequiredValid(form.description) &&
    isRequiredValid(form.price);

  const handleChange = (field: keyof AddItemFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const saveItem = (): void => {
    console.info('saveItem');
    props.onSave?.(form);
  };

  return null as unknown as JSX.Element;
};
