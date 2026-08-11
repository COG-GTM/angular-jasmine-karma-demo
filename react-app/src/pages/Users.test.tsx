import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Users from './Users';

describe('Users page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads users when the button is clicked', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, name: 'Leanne Graham' }],
      }),
    );
    render(<Users />);

    await userEvent.click(screen.getByRole('button', { name: 'Get Users' }));

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
  });
});
