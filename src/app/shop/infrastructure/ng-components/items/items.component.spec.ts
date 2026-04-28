import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ItemsComponent } from './items.component';
import { ItemComponent } from '../item/item.component';

describe('ItemsComponent: testing search/filter functionality', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent, ItemComponent ],
      imports: [
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule
      ]
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

  it('should initialize with 6 items', () => {
    expect(component.items.length).toBe(6);
    expect(component.filteredItems.length).toBe(6);
  });

  it('should have correct initial item data', () => {
    expect(component.items[0].name).toBe('foo');
    expect(component.items[1].name).toBe('mario');
    expect(component.items[2].name).toBe('luigi');
  });

  it('should filter items by name', () => {
    component.onSearchChange('mario');
    expect(component.filteredItems.length).toBe(1);
    expect(component.filteredItems[0].name).toBe('mario');
  });

  it('should filter items by description', () => {
    component.onSearchChange('bross');
    expect(component.filteredItems.length).toBe(2);
    expect(component.filteredItems[0].name).toBe('luigi');
    expect(component.filteredItems[1].name).toBe('mario');
  });

  it('should be case-insensitive', () => {
    component.onSearchChange('MARIO');
    expect(component.filteredItems.length).toBe(1);
    expect(component.filteredItems[0].name).toBe('mario');
  });

  it('should return all items when search is empty', () => {
    component.onSearchChange('mario');
    expect(component.filteredItems.length).toBe(1);
    
    component.onSearchChange('');
    expect(component.filteredItems.length).toBe(6);
  });

  it('should return all items when search contains only whitespace', () => {
    component.onSearchChange('   ');
    expect(component.filteredItems.length).toBe(6);
  });

  it('should return empty array when no items match', () => {
    component.onSearchChange('nonexistent');
    expect(component.filteredItems.length).toBe(0);
  });

  it('should update searchQuery property', () => {
    component.onSearchChange('test query');
    expect(component.searchQuery).toBe('test query');
  });

  it('should display search input in template', () => {
    const searchInput = fixture.debugElement.query(By.css('.search-input'));
    expect(searchInput).toBeTruthy();
  });

  it('should display all items initially in template', () => {
    const itemElements = fixture.debugElement.queryAll(By.css('app-item'));
    expect(itemElements.length).toBe(6);
  });

  it('should update displayed items when search changes', () => {
    component.onSearchChange('mario');
    fixture.detectChanges();
    
    const itemElements = fixture.debugElement.queryAll(By.css('app-item'));
    expect(itemElements.length).toBe(1);
  });

  it('should show no results message when search yields no results', () => {
    component.onSearchChange('nonexistent');
    fixture.detectChanges();
    
    const noResultsElement = fixture.debugElement.query(By.css('.no-results'));
    expect(noResultsElement).toBeTruthy();
  });

  it('should not show no results message when items are found', () => {
    component.onSearchChange('mario');
    fixture.detectChanges();
    
    const noResultsElement = fixture.debugElement.query(By.css('.no-results'));
    expect(noResultsElement).toBeFalsy();
  });

  it('should filter items when search input value changes', () => {
    const searchInput = fixture.debugElement.query(By.css('.search-input input')).nativeElement;
    
    searchInput.value = 'luigi';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(component.filteredItems.length).toBe(1);
    expect(component.filteredItems[0].name).toBe('luigi');
  });

});

describe('ItemsComponent: testing sort functionality', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent, ItemComponent ],
      imports: [
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have sort options defined', () => {
    expect(component.sortOptions.length).toBe(4);
    expect(component.sortOptions[0].value).toBe('name-asc');
    expect(component.sortOptions[0].label).toBe('Name (A-Z)');
  });

  it('should have default sort as name-asc', () => {
    expect(component.selectedSort).toBe('name-asc');
  });

  it('should sort items by name ascending', () => {
    component.onSortChange('name-asc');
    expect(component.filteredItems[0].name).toBe('foo');
    expect(component.filteredItems[1].name).toBe('luigi');
    expect(component.filteredItems[2].name).toBe('mario');
  });

  it('should sort items by name descending', () => {
    component.onSortChange('name-desc');
    expect(component.filteredItems[0].name).toBe('yoshi');
    expect(component.filteredItems[1].name).toBe('toad');
    expect(component.filteredItems[2].name).toBe('peach');
  });

  it('should sort items by price ascending', () => {
    component.onSortChange('price-asc');
    expect(component.filteredItems[0].name).toBe('toad');
    expect(component.filteredItems[0].price).toBe('111');
    expect(component.filteredItems[1].name).toBe('foo');
    expect(component.filteredItems[1].price).toBe('123');
  });

  it('should sort items by price descending', () => {
    component.onSortChange('price-desc');
    expect(component.filteredItems[0].name).toBe('peach');
    expect(component.filteredItems[0].price).toBe('999');
    expect(component.filteredItems[1].name).toBe('luigi');
    expect(component.filteredItems[1].price).toBe('789');
  });

  it('should update selectedSort when sort changes', () => {
    component.onSortChange('price-desc');
    expect(component.selectedSort).toBe('price-desc');
  });

  it('should apply sort after filtering', () => {
    component.onSearchChange('bross');
    component.onSortChange('name-desc');
    expect(component.filteredItems.length).toBe(2);
    expect(component.filteredItems[0].name).toBe('mario');
    expect(component.filteredItems[1].name).toBe('luigi');
  });

  it('should display sort select in template', () => {
    const sortSelect = fixture.debugElement.query(By.css('.sort-select'));
    expect(sortSelect).toBeTruthy();
  });

  it('should maintain sort when search is cleared', () => {
    component.onSortChange('price-desc');
    component.onSearchChange('mario');
    expect(component.filteredItems[0].name).toBe('mario');
    
    component.onSearchChange('');
    expect(component.filteredItems[0].name).toBe('peach');
    expect(component.filteredItems[0].price).toBe('999');
  });

});
