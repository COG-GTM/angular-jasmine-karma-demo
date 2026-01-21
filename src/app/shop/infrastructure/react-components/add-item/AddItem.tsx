import React from 'react';
import { useForm } from 'react-hook-form';

interface AddItemFormData {
  name: string;
  description: string;
  price: string;
}

export const AddItem: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddItemFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      price: '',
    },
  });

  const saveItem = (data: AddItemFormData): void => {
    console.info('saveItem', data);
  };

  return (
    <div>
      <p>add-item works!</p>
      <form onSubmit={handleSubmit(saveItem)}>
        <div className="mat-form-field">
          <label className="mat-label">name</label>
          <input
            type="text"
            placeholder="name"
            {...register('name', { required: true })}
          />
          {errors.name && <span className="error">Name is required</span>}
        </div>
        <div className="mat-form-field">
          <label className="mat-label">description</label>
          <input
            type="text"
            placeholder="description"
            {...register('description', { required: true })}
          />
          {errors.description && <span className="error">Description is required</span>}
        </div>
        <div className="mat-form-field">
          <label className="mat-label">price</label>
          <input
            type="text"
            placeholder="price"
            {...register('price', { required: true })}
          />
          {errors.price && <span className="error">Price is required</span>}
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="mat-raised-button mat-warn"
        >
          <span className="mat-icon">save</span> Save
        </button>
      </form>
    </div>
  );
};
