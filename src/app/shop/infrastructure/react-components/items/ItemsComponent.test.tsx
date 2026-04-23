import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ItemsComponent } from './ItemsComponent';

describe('ItemsComponent', () => {
  it('should create', () => {
    const { container } = render(<ItemsComponent />);
    expect(container).toBeTruthy();
  });

  it('should render the heading text', () => {
    render(<ItemsComponent />);
    expect(screen.getByText('items shop')).toBeInTheDocument();
  });

  it('should render three items', () => {
    render(<ItemsComponent />);
    const items = screen.getAllByRole('button', { name: 'like' });
    expect(items).toHaveLength(3);
  });

  it('should render item names', () => {
    render(<ItemsComponent />);
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('mario')).toBeInTheDocument();
    expect(screen.getByText('luigi')).toBeInTheDocument();
  });

  it('should render item descriptions', () => {
    render(<ItemsComponent />);
    const brossElements = screen.getAllByText('bross');
    expect(brossElements).toHaveLength(2);
    expect(screen.getByText('bar')).toBeInTheDocument();
  });

  it('should render item prices', () => {
    render(<ItemsComponent />);
    expect(screen.getByText(/123/)).toBeInTheDocument();
    expect(screen.getByText(/456/)).toBeInTheDocument();
    expect(screen.getByText(/789/)).toBeInTheDocument();
  });

  it('should log to console when like button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();
    render(<ItemsComponent />);
    const likeButtons = screen.getAllByRole('button', { name: 'like' });
    fireEvent.click(likeButtons[0]);
    expect(consoleSpy).toHaveBeenCalledWith('like foo');
    consoleSpy.mockRestore();
  });
});
