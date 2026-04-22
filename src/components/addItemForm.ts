export interface AddItemFormState {
  name: string;
  description: string;
  price: string;
}

export const EMPTY_FORM: AddItemFormState = {
  name: "",
  description: "",
  price: "",
};

export function isFormValid(form: AddItemFormState): boolean {
  return (
    form.name.trim() !== "" &&
    form.description.trim() !== "" &&
    form.price.trim() !== ""
  );
}
