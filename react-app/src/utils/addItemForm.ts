export interface AddItemForm {
  name: string;
  description: string;
  price: string;
}

export const emptyForm: AddItemForm = { name: '', description: '', price: '' };

export function isFormValid(form: AddItemForm): boolean {
  return form.name.trim() !== '' && form.description.trim() !== '' && form.price.trim() !== '';
}
