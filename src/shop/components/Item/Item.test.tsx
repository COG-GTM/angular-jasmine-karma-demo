import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Item from './Item';

describe('ItemComponent: testing basic component creation', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Test para comprobar que el componente se crea correctamente
  it('should create', () => {
    // Arrange & Act
    const { container } = render(
      <Item name="Test Item" description="Test Description" price="100" />,
    );

    // Assert
    expect(container.firstChild).toBeTruthy();
  });

  // Test for @Input properties - name
  it('should accept name input', () => {
    // Arrange
    const { rerender } = render(
      <Item name="" description="Test Description" price="100" />,
    );

    // Act
    rerender(<Item name="Test Item" description="Test Description" price="100" />);

    // Assert
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  // Test for @Input properties - description
  it('should accept description input', () => {
    // Arrange
    const { rerender } = render(
      <Item name="Test Item" description="" price="100" />,
    );

    // Act
    rerender(<Item name="Test Item" description="Test Description" price="100" />);

    // Assert
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  // Test for @Input properties - price
  it('should accept price input', () => {
    // Arrange
    const { rerender } = render(
      <Item name="Test Item" description="Test Description" price="" />,
    );

    // Act
    rerender(<Item name="Test Item" description="Test Description" price="100" />);

    // Assert
    expect(screen.getByText('100 €')).toBeInTheDocument();
  });

  // Test for the like() method
  it('should call like() method', () => {
    // Arrange
    vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<Item name="Test Item" description="Test Description" price="100" />);

    // Act
    screen.getByRole('button', { name: 'like' }).click();

    // Assert
    expect(console.info).toHaveBeenCalledWith('like Test Item');
  });

  // Test for rendering name in the template
  it('should render name in the template', () => {
    // Arrange & Act
    const { container } = render(
      <Item name="Test Item" description="Test Description" price="100" />,
    );

    // Assert
    expect(container.textContent).toContain('Test Item');
  });

  // Test for rendering price in the template
  it('should render price in the template', () => {
    // Arrange & Act
    const { container } = render(
      <Item name="Test Item" description="Test Description" price="100" />,
    );

    // Assert
    expect(container.textContent).toContain('100 €');
  });

  // Test for rendering description in the template
  it('should render description in the template', () => {
    // Arrange & Act
    const { container } = render(
      <Item name="Test Item" description="Test Description" price="100" />,
    );

    // Assert
    expect(container.textContent).toContain('Test Description');
  });

  // Test for like button click
  it('should call like() when like button is clicked', async () => {
    // Arrange
    vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<Item name="Test Item" description="Test Description" price="100" />);

    // Act
    await userEvent.click(screen.getByRole('button', { name: 'like' }));

    // Assert
    expect(console.info).toHaveBeenCalledTimes(1);
  });

  it('should render the like button with the favorite icon', () => {
    // Arrange & Act
    render(<Item name="Test Item" description="Test Description" price="100" />);

    // Assert
    const likeButton = screen.getByRole('button', { name: 'like' });
    expect(likeButton).toBeInTheDocument();
    expect(likeButton.querySelector('[data-testid="FavoriteIcon"]')).toBeInTheDocument();
  });
});
