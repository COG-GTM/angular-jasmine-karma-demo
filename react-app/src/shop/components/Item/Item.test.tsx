import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Item, type ItemProps } from './Item';

// Port of item.component.spec.ts.
// Angular needed TestBed.configureTestingModule + compileComponents to build a test module, and a
// ComponentFixture to reach the instance and its DOM. In React a component is just a function:
// RTL's render() mounts it into a jsdom container and `screen` queries the rendered DOM.
describe('Item', () => {
  const props: ItemProps = { name: 'Test Item', description: 'Test Description', price: '100' };

  // Angular set @Input fields on the instance and called fixture.detectChanges() to bind them.
  // In React inputs are props: they are passed to render(), and the DOM is up to date right away.
  const renderItem = (overrides: Partial<ItemProps> = {}) => render(<Item {...props} {...overrides} />);

  it('should create', () => {
    // Arrange / Act
    const { container } = renderItem();

    // Assert: there is no component instance to check, so check that something was rendered.
    expect(container.firstChild).toBeInTheDocument();
    expect(container.querySelector('.card')).toBeInTheDocument();
  });

  it('should accept name input', () => {
    // Angular read component.name back; we check the prop's effect in the DOM instead.
    renderItem({ name: 'Another Item' });

    expect(screen.getByText('Another Item')).toBeInTheDocument();
  });

  it('should accept description input', () => {
    renderItem({ description: 'Another Description' });

    expect(screen.getByText('Another Description')).toBeInTheDocument();
  });

  it('should accept price input', () => {
    renderItem({ price: '250' });

    expect(screen.getByText('250 €')).toBeInTheDocument();
  });

  it('should call console.info with "like <name>" when like is triggered', async () => {
    // Arrange: Jasmine's spyOn(console, 'info') -> vi.spyOn. mockImplementation keeps the test
    // output clean; restoreMocks (vite.config.ts) restores the real console.info after each test.
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    renderItem();

    // Act: like() is not reachable from outside the component, so trigger it like a user would.
    await userEvent.click(screen.getByRole('button', { name: 'like' }));

    // Assert
    expect(info).toHaveBeenCalledWith('like Test Item');
  });

  it('should render name in the template', () => {
    // fixture.nativeElement.textContent -> the RTL container's textContent.
    const { container } = renderItem();

    expect(container).toHaveTextContent('Test Item');
  });

  it('should render price in the template', () => {
    const { container } = renderItem();

    expect(container).toHaveTextContent('100 €');
    expect(screen.getByText('100 €').tagName).toBe('P');
  });

  it('should render description in the template', () => {
    const { container } = renderItem();

    expect(container).toHaveTextContent('Test Description');
    expect(screen.getByText('Test Description').tagName).toBe('P');
  });

  it('should call like once when the like button is clicked', async () => {
    // Angular spied on component.like and clicked the button found with By.css('button').
    // React has no instance method to spy on, so we spy on the side effect (console.info) and
    // find the button the way a user / screen reader would: by role and accessible name.
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    renderItem();

    await userEvent.click(screen.getByRole('button', { name: 'like' }));

    expect(info).toHaveBeenCalledTimes(1);
  });

  it('should expose the like button by role and aria-label', () => {
    renderItem();

    const button = screen.getByRole('button', { name: 'like' });

    expect(button).toHaveAttribute('aria-label', 'like');
    expect(button).toHaveClass('MuiIconButton-colorError');
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('should render the favorite icon inside the like button', () => {
    renderItem();

    expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'like' })).toContainElement(screen.getByTestId('FavoriteIcon'));
  });

  it('should not log anything until like is clicked', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});

    renderItem();

    expect(info).not.toHaveBeenCalled();
  });
});
