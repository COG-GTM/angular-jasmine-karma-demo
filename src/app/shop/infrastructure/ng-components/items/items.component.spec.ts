import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items.component';

describe('ItemsComponent: testing sorting functionality', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should have items array initialized with 5 items', () => {
      // Arrange & Act
      const itemCount = component.items.length;

      // Assert
      expect(itemCount).toBe(5);
    });

    it('should have sortBy initialized to "name"', () => {
      // Arrange & Act
      const sortBy = component.sortBy;

      // Assert
      expect(sortBy).toBe('name');
    });

    it('should have sortOrder initialized to "asc"', () => {
      // Arrange & Act
      const sortOrder = component.sortOrder;

      // Assert
      expect(sortOrder).toBe('asc');
    });

    it('should have items in default order (by name ascending)', () => {
      // Arrange & Act
      const itemNames = component.items.map(item => item.name);

      // Assert
      expect(itemNames).toEqual(['apple', 'banana', 'foo', 'luigi', 'mario']);
    });
  });

  describe('Sorting by Name', () => {
    it('should sort items by name in ascending order', () => {
      // Arrange
      component.sortBy = 'price';
      component.sortOrder = 'desc';

      // Act
      component.sortItems('name');

      // Assert
      expect(component.sortBy).toBe('name');
      expect(component.sortOrder).toBe('asc');
      expect(component.items[0].name).toBe('apple');
      expect(component.items[component.items.length - 1].name).toBe('mario');
    });

    it('should sort items by name in descending order when toggled', () => {
      // Arrange
      component.sortBy = 'name';
      component.sortOrder = 'asc';

      // Act
      component.sortItems('name');

      // Assert
      expect(component.sortBy).toBe('name');
      expect(component.sortOrder).toBe('desc');
      expect(component.items[0].name).toBe('mario');
      expect(component.items[component.items.length - 1].name).toBe('apple');
    });
  });

  describe('Sorting by Description', () => {
    it('should sort items by description in ascending order', () => {
      // Arrange
      component.sortBy = 'name';

      // Act
      component.sortItems('description');

      // Assert
      expect(component.sortBy).toBe('description');
      expect(component.sortOrder).toBe('asc');
      expect(component.items[0].description).toBe('bar');
      expect(component.items[1].description).toBe('bross');
      expect(component.items[component.items.length - 1].description).toBe('fruit');
    });

    it('should sort items by description in descending order when toggled', () => {
      // Arrange
      component.sortBy = 'description';
      component.sortOrder = 'asc';

      // Act
      component.sortItems('description');

      // Assert
      expect(component.sortBy).toBe('description');
      expect(component.sortOrder).toBe('desc');
      expect(component.items[0].description).toBe('fruit');
      expect(component.items[component.items.length - 1].description).toBe('bar');
    });
  });

  describe('Sorting by Price', () => {
    it('should sort items by price in ascending order', () => {
      // Arrange
      component.sortBy = 'name';

      // Act
      component.sortItems('price');

      // Assert
      expect(component.sortBy).toBe('price');
      expect(component.sortOrder).toBe('asc');
      expect(component.items[0].price).toBe(59);
      expect(component.items[1].price).toBe(99);
      expect(component.items[component.items.length - 1].price).toBe(789);
    });

    it('should sort items by price in descending order when toggled', () => {
      // Arrange
      component.sortBy = 'price';
      component.sortOrder = 'asc';

      // Act
      component.sortItems('price');

      // Assert
      expect(component.sortBy).toBe('price');
      expect(component.sortOrder).toBe('desc');
      expect(component.items[0].price).toBe(789);
      expect(component.items[component.items.length - 1].price).toBe(59);
    });
  });

  describe('Toggle Behavior', () => {
    it('should toggle sortOrder from asc to desc when clicking same field', () => {
      // Arrange
      component.sortBy = 'name';
      component.sortOrder = 'asc';

      // Act
      component.sortItems('name');

      // Assert
      expect(component.sortOrder).toBe('desc');
      expect(component.sortBy).toBe('name');
    });

    it('should toggle sortOrder from desc to asc when clicking same field', () => {
      // Arrange
      component.sortBy = 'price';
      component.sortOrder = 'desc';

      // Act
      component.sortItems('price');

      // Assert
      expect(component.sortOrder).toBe('asc');
      expect(component.sortBy).toBe('price');
    });
  });

  describe('Switching Between Sort Fields', () => {
    it('should reset sortOrder to asc when switching to different field', () => {
      // Arrange
      component.sortBy = 'name';
      component.sortOrder = 'desc';

      // Act
      component.sortItems('price');

      // Assert
      expect(component.sortBy).toBe('price');
      expect(component.sortOrder).toBe('asc');
    });

    it('should reset sortOrder to asc when switching from desc to new field', () => {
      // Arrange
      component.sortBy = 'description';
      component.sortOrder = 'desc';

      // Act
      component.sortItems('name');

      // Assert
      expect(component.sortBy).toBe('name');
      expect(component.sortOrder).toBe('asc');
    });

    it('should handle multiple field switches correctly', () => {
      // Arrange
      component.sortBy = 'name';
      component.sortOrder = 'asc';

      // Act - First switch
      component.sortItems('price');

      // Assert - First switch
      expect(component.sortBy).toBe('price');
      expect(component.sortOrder).toBe('asc');

      // Act - Second switch
      component.sortItems('description');

      // Assert - Second switch
      expect(component.sortBy).toBe('description');
      expect(component.sortOrder).toBe('asc');

      // Act - Third switch (back to name)
      component.sortItems('name');

      // Assert - Third switch
      expect(component.sortBy).toBe('name');
      expect(component.sortOrder).toBe('asc');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty array without errors', () => {
      // Arrange
      component.items = [];

      // Act
      component.sortItems('name');

      // Assert
      expect(component.items.length).toBe(0);
      expect(component.sortBy).toBe('name');
      expect(component.sortOrder).toBe('asc');
    });

    it('should handle single item array', () => {
      // Arrange
      component.items = [{ name: 'single', description: 'item', price: 100 }];

      // Act
      component.sortItems('name');

      // Assert
      expect(component.items.length).toBe(1);
      expect(component.items[0].name).toBe('single');
    });

    it('should handle items with same sort field values', () => {
      // Arrange
      component.items = [
        { name: 'item1', description: 'same', price: 100 },
        { name: 'item2', description: 'same', price: 200 }
      ];

      // Act
      component.sortItems('description');

      // Assert
      expect(component.sortBy).toBe('description');
      expect(component.sortOrder).toBe('asc');
      expect(component.items.length).toBe(2);
      expect(component.items[0].description).toBe('same');
      expect(component.items[1].description).toBe('same');
    });

    it('should handle price as numeric comparison correctly', () => {
      // Arrange
      component.items = [
        { name: 'a', description: 'desc', price: 9 },
        { name: 'b', description: 'desc', price: 100 },
        { name: 'c', description: 'desc', price: 50 }
      ];

      // Act
      component.sortItems('price');

      // Assert
      expect(component.items[0].price).toBe(9);
      expect(component.items[1].price).toBe(50);
      expect(component.items[2].price).toBe(100);
    });
  });

  describe('Sort Order Consistency', () => {
    it('should maintain sort order after multiple sorts on same field', () => {
      // Arrange
      const initialOrder = [...component.items];

      // Act - First sort
      component.sortItems('name');
      const afterFirstSort = [...component.items];

      // Act - Toggle to desc
      component.sortItems('name');
      const afterSecondSort = [...component.items];

      // Act - Toggle back to asc
      component.sortItems('name');
      const afterThirdSort = [...component.items];

      // Assert
      expect(component.sortOrder).toBe('asc');
      expect(afterFirstSort).not.toEqual(initialOrder);
      expect(afterSecondSort).toEqual(afterFirstSort.reverse());
      expect(afterThirdSort).toEqual(afterFirstSort);
    });
  });
});