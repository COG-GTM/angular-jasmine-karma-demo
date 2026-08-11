import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import AddItem from './AddItem';

describe('AddItem', () => {
  it('keeps save disabled until every field is filled in', async () => {
    render(<AddItem />);
    const save = screen.getByRole('button', { name: /save/i });

    expect(save).toBeDisabled();

    await userEvent.type(screen.getByLabelText('name'), 'foo');
    await userEvent.type(screen.getByLabelText('description'), 'bar');
    expect(save).toBeDisabled();

    await userEvent.type(screen.getByLabelText('price'), '123');
    expect(save).toBeEnabled();
  });
});
