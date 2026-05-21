import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import type { Item } from "../models/Item";

interface FormState {
  name: string;
  description: string;
  price: string;
}

interface FormTouched {
  name: boolean;
  description: boolean;
  price: boolean;
}

interface AddItemProps {
  onSave?: (item: Item) => void;
}

export default function AddItem({ onSave }: AddItemProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    price: "",
  });

  const [touched, setTouched] = useState<FormTouched>({
    name: false,
    description: false,
    price: false,
  });

  const isValid =
    form.name.trim() !== "" &&
    form.description.trim() !== "" &&
    form.price.trim() !== "";

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: keyof FormTouched) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function saveItem() {
    console.info("saveItem");
    if (onSave) {
      onSave({ ...form });
    }
    setForm({ name: "", description: "", price: "" });
    setTouched({ name: false, description: false, price: false });
  }

  return (
    <div>
      <p>add-item works!</p>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField
          variant="filled"
          label="name"
          placeholder="name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          error={touched.name && form.name.trim() === ""}
          helperText={
            touched.name && form.name.trim() === ""
              ? "name is required"
              : ""
          }
          required
        />
        <TextField
          variant="filled"
          label="description"
          placeholder="description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          onBlur={() => handleBlur("description")}
          error={touched.description && form.description.trim() === ""}
          helperText={
            touched.description && form.description.trim() === ""
              ? "description is required"
              : ""
          }
          required
        />
        <TextField
          variant="filled"
          label="price"
          placeholder="price"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
          onBlur={() => handleBlur("price")}
          error={touched.price && form.price.trim() === ""}
          helperText={
            touched.price && form.price.trim() === ""
              ? "price is required"
              : ""
          }
          required
        />
        <Button
          disabled={!isValid}
          type="button"
          variant="contained"
          color="error"
          startIcon={<SaveIcon />}
          onClick={saveItem}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
