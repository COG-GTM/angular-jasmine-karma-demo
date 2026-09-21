import { fireEvent, render, screen } from '@testing-library/react';
import { Items } from './Items';

const renderedNames = () =>
  Array.from(document.querySelectorAll('.mat-card-title')).map((el) => el.textContent);

describe('Items', () => {
  it('should render all items in original order with name active', () => {
    render(<Items />);
    expect(screen.getByText('Shop Items')).toBeInTheDocument();
    expect(renderedNames()).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
    expect(screen.getByRole('button', { name: /Name/ })).toHaveClass('active');
  });

  it('should toggle order when clicking the active field', () => {
    render(<Items />);
    const nameBtn = screen.getByRole('button', { name: /Name/ });
    fireEvent.click(nameBtn);
    expect(renderedNames()).toEqual(['mario', 'luigi', 'foo', 'banana', 'apple']);
    expect(nameBtn).toHaveTextContent('Name ↓');
    fireEvent.click(nameBtn);
    expect(renderedNames()).toEqual(['apple', 'banana', 'foo', 'luigi', 'mario']);
    expect(nameBtn).toHaveTextContent('Name ↑');
  });

  it('should sort ascending when switching field', () => {
    render(<Items />);
    const priceBtn = screen.getByRole('button', { name: /Price/ });
    fireEvent.click(priceBtn);
    expect(priceBtn).toHaveClass('active');
    expect(priceBtn).toHaveTextContent('Price ↑');
    expect(renderedNames()).toEqual(['foo', 'mario', 'banana', 'luigi', 'apple']);
  });
});
