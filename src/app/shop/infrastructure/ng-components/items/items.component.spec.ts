import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ItemsComponent } from './items.component';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent ],
      imports: [ FormsModule ]
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

  it('should initialize with sample items', () => {
    expect(component.items.length).toBeGreaterThan(0);
    expect(component.items[0].name).toBeDefined();
    expect(component.items[0].description).toBeDefined();
    expect(component.items[0].price).toBeDefined();
  });

  it('should extract categories from items', () => {
    component.ngOnInit();
    expect(component.categories.length).toBeGreaterThan(0);
    expect(component.categories).toContain('Electronics');
    expect(component.categories).toContain('Appliances');
    expect(component.categories).toContain('Furniture');
  });

  it('should filter items by search text', () => {
    component.filterText = 'laptop';
    const filtered = component.filteredAndSortedItems;
    expect(filtered.length).toBe(1);
    expect(filtered[0].name.toLowerCase()).toContain('laptop');
  });

  it('should filter items by category', () => {
    component.selectedCategory = 'Electronics';
    const filtered = component.filteredAndSortedItems;
    expect(filtered.length).toBeGreaterThan(0);
    filtered.forEach(item => {
      expect(item.category).toBe('Electronics');
    });
  });

  it('should sort items by name', () => {
    component.onSortChange('name');
    component.sortOrder = 'asc';
    const sorted = component.filteredAndSortedItems;
    
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i-1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('should sort items by price numerically', () => {
    component.onSortChange('price');
    component.sortOrder = 'asc';
    const sorted = component.filteredAndSortedItems;
    
    for (let i = 1; i < sorted.length; i++) {
      const prevPrice = parseFloat(sorted[i-1].price) || 0;
      const currPrice = parseFloat(sorted[i].price) || 0;
      expect(prevPrice).toBeLessThanOrEqual(currPrice);
    }
  });

  it('should toggle sort order when clicking same field', () => {
    component.sortField = 'name';
    component.sortOrder = 'asc';
    
    component.onSortChange('name');
    expect(component.sortOrder).toBe('desc');
    
    component.onSortChange('name');
    expect(component.sortOrder).toBe('asc');
  });

  it('should change sort field and reset order when clicking different field', () => {
    component.sortField = 'name';
    component.sortOrder = 'desc';
    
    component.onSortChange('price');
    expect(component.sortField).toBe('price');
    expect(component.sortOrder).toBe('asc');
  });

  it('should clear all filters', () => {
    component.filterText = 'test';
    component.selectedCategory = 'Electronics';
    component.sortField = 'price';
    component.sortOrder = 'desc';
    
    component.clearFilters();
    
    expect(component.filterText).toBe('');
    expect(component.selectedCategory).toBe('');
    expect(component.sortField).toBe('name');
    expect(component.sortOrder).toBe('asc');
  });

  it('should combine search and category filters', () => {
    component.filterText = 'chair';
    component.selectedCategory = 'Furniture';
    const filtered = component.filteredAndSortedItems;
    
    expect(filtered.length).toBe(1);
    expect(filtered[0].name.toLowerCase()).toContain('chair');
    expect(filtered[0].category).toBe('Furniture');
  });
});
