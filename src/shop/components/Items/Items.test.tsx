import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Items } from './Items';

// Component tests drive Items the way a user does: click the sort buttons and read
// the rendered DOM. Items are found by their text, so these tests work with both the
// placeholder Item and the final MUI Item card.

const SEED_NAMES = ['foo', 'mario', 'luigi', 'apple', 'banana'];

function renderItems() {
  const user = userEvent.setup();
  const view = render(<Items />);
  const grid = view.container.querySelector<HTMLElement>('.items-grid');
  if (!grid) throw new Error('.items-grid not rendered');
  return { user, grid };
}

// Order of the item names as they appear in the grid (document order).
function renderedNames(grid: HTMLElement): string[] {
  return SEED_NAMES.map((name) => ({ name, node: within(grid).getByText(name) })).sort((a, b) =>
    a.node.compareDocumentPosition(b.node) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
  ).map(({ name }) => name);
}

const button = (name: RegExp) => screen.getByRole('button', { name });
const nameButton = () => button(/^Name/);
const descriptionButton = () => button(/^Description/);
const priceButton = () => button(/^Price/);

describe('Items component', () => {
  it('should create', () => {
    // Arrange & Act
    const { grid } = renderItems();

    // Assert
    expect(grid).toBeInTheDocument();
  });

  it('renders the heading, the "Sort by:" label and three sort buttons', () => {
    // Arrange & Act
    renderItems();

    // Assert
    expect(screen.getByRole('heading', { name: 'Shop Items' })).toBeInTheDocument();
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button').filter((b) => b.classList.contains('sort-btn'));
    expect(buttons.map((b) => b.textContent)).toEqual(['Name ↑', 'Description', 'Price']);
  });

  it('renders every seed item with its name, description and price', () => {
    // Arrange & Act
    const { grid } = renderItems();

    // Assert
    for (const name of SEED_NAMES) {
      expect(within(grid).getByText(name)).toBeInTheDocument();
    }
    expect(within(grid).getByText('bar')).toBeInTheDocument();
    expect(within(grid).getAllByText('bross')).toHaveLength(2);
    expect(within(grid).getAllByText('fruit')).toHaveLength(2);
    expect(within(grid).getByText('123 €')).toBeInTheDocument();
    expect(within(grid).getByText('59 €')).toBeInTheDocument();
  });

  it('first render shows the seed order with Name ↑ active (legacy never sorts on init)', () => {
    // Arrange & Act
    const { grid } = renderItems();

    // Assert
    expect(renderedNames(grid)).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
    expect(nameButton()).toHaveTextContent('Name ↑');
    expect(nameButton()).toHaveClass('sort-btn', 'active');
    expect(descriptionButton()).not.toHaveClass('active');
    expect(priceButton()).not.toHaveClass('active');
  });

  it('clicking Name once sorts by name descending and shows ↓', async () => {
    // Arrange
    const { user, grid } = renderItems();

    // Act
    await user.click(nameButton());

    // Assert
    expect(renderedNames(grid)).toEqual(['mario', 'luigi', 'foo', 'banana', 'apple']);
    expect(nameButton()).toHaveTextContent('Name ↓');
    expect(nameButton()).toHaveClass('active');
  });

  it('clicking Name twice sorts by name ascending and shows ↑', async () => {
    // Arrange
    const { user, grid } = renderItems();

    // Act
    await user.click(nameButton());
    await user.click(nameButton());

    // Assert
    expect(renderedNames(grid)).toEqual(['apple', 'banana', 'foo', 'luigi', 'mario']);
    expect(nameButton()).toHaveTextContent('Name ↑');
  });

  it('clicking Description sorts ascending, moves the active class and the arrow', async () => {
    // Arrange
    const { user, grid } = renderItems();

    // Act
    await user.click(descriptionButton());

    // Assert
    expect(renderedNames(grid)).toEqual(['foo', 'mario', 'luigi', 'apple', 'banana']);
    expect(descriptionButton()).toHaveTextContent('Description ↑');
    expect(descriptionButton()).toHaveClass('active');
    expect(nameButton()).toHaveTextContent(/^Name$/);
    expect(nameButton()).not.toHaveClass('active');
  });

  it('clicking Description twice sorts descending', async () => {
    // Arrange
    const { user, grid } = renderItems();

    // Act
    await user.click(descriptionButton());
    await user.click(descriptionButton());

    // Assert
    expect(renderedNames(grid)).toEqual(['apple', 'banana', 'mario', 'luigi', 'foo']);
    expect(descriptionButton()).toHaveTextContent('Description ↓');
  });

  it('clicking Price sorts prices as strings ascending (legacy parity)', async () => {
    // Arrange
    const { user, grid } = renderItems();

    // Act
    await user.click(priceButton());

    // Assert - '123' < '456' < '59' < '789' < '99'
    expect(renderedNames(grid)).toEqual(['foo', 'mario', 'banana', 'luigi', 'apple']);
    expect(priceButton()).toHaveTextContent('Price ↑');
    expect(priceButton()).toHaveClass('active');
  });

  it('clicking Price twice sorts prices as strings descending', async () => {
    // Arrange
    const { user, grid } = renderItems();

    // Act
    await user.click(priceButton());
    await user.click(priceButton());

    // Assert
    expect(renderedNames(grid)).toEqual(['apple', 'luigi', 'banana', 'mario', 'foo']);
    expect(priceButton()).toHaveTextContent('Price ↓');
  });

  it('switching back to Name after another field resets to ascending', async () => {
    // Arrange
    const { user, grid } = renderItems();

    // Act
    await user.click(descriptionButton());
    await user.click(descriptionButton());
    await user.click(nameButton());

    // Assert
    expect(renderedNames(grid)).toEqual(['apple', 'banana', 'foo', 'luigi', 'mario']);
    expect(nameButton()).toHaveTextContent('Name ↑');
    expect(descriptionButton()).toHaveTextContent(/^Description$/);
  });

  it('ties keep the order of the previous sort (stable re-sort of the current list)', async () => {
    // Arrange
    const { user, grid } = renderItems();

    // Act - name descending, then description ascending
    await user.click(nameButton());
    await user.click(descriptionButton());

    // Assert - bross: mario before luigi, fruit: banana before apple
    expect(renderedNames(grid)).toEqual(['foo', 'mario', 'luigi', 'banana', 'apple']);
  });
});
