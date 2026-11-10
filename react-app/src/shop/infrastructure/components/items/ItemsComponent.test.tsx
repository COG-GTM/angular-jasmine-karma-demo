import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemsComponent from './ItemsComponent';

const names = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('.items-grid .MuiCardHeader-title')).map(
    (el) => el.textContent,
  );
const sortButton = (label: string) =>
  within(document.querySelector('.sort-controls') as HTMLElement).getByRole('button', {
    name: new RegExp(`^${label}`),
  });

describe('ItemsComponent', () => {
  it('renders the heading, sort controls and five items in source order', () => {
    const { container } = render(<ItemsComponent />);
    expect(screen.getByRole('heading', { name: 'Shop Items' })).toBeInTheDocument();
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
    expect(names(container)).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
  });

  it('marks Name ↑ active initially without sorting', () => {
    render(<ItemsComponent />);
    expect(sortButton('Name')).toHaveClass('sort-btn', 'active');
    expect(sortButton('Name')).toHaveTextContent('Name ↑');
    expect(sortButton('Description')).not.toHaveClass('active');
    expect(sortButton('Price')).toHaveTextContent(/^Price\s*$/);
  });

  it('first click on Name toggles to descending', async () => {
    const { container } = render(<ItemsComponent />);
    await userEvent.click(sortButton('Name'));
    expect(sortButton('Name')).toHaveTextContent('Name ↓');
    expect(names(container)).toEqual(['mario', 'luigi', 'foo', 'banana', 'apple']);
  });

  it('switching field resets to ascending and moves the active class', async () => {
    const { container } = render(<ItemsComponent />);
    await userEvent.click(sortButton('Price'));
    expect(sortButton('Price')).toHaveClass('active');
    expect(sortButton('Price')).toHaveTextContent('Price ↑');
    expect(sortButton('Name')).not.toHaveClass('active');
    expect(names(container)).toEqual(['foo', 'mario', 'banana', 'luigi', 'apple']);
  });

  it('sorts by description, keeping ties stable', async () => {
    const { container } = render(<ItemsComponent />);
    await userEvent.click(sortButton('Description'));
    expect(names(container)).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
    await userEvent.click(sortButton('Description'));
    expect(names(container)).toEqual(['apple', 'banana', 'mario', 'luigi', 'foo']);
  });
});
