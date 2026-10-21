import { render, screen } from '@testing-library/react';
import { AddItem } from './AddItem';

// Placeholder smoke test: the AddItem child replaces this file with the add-item.component.spec.ts port.
describe('AddItem (placeholder)', () => {
  it('renders the add-item works! text', () => {
    render(<AddItem />);

    expect(screen.getByText('add-item works!')).toBeInTheDocument();
  });
});
