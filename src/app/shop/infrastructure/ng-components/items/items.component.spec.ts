import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ItemsComponent } from './items.component';

describe('ItemsComponent: testing search/filter functionality', () => {
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

  it('should initialize with 3 items', () => {
    expect(component.items.length).toBe(3);
    expect(component.filteredItems.length).toBe(3);
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
    expect(component.filteredItems[0].name).toBe('mario');
    expect(component.filteredItems[1].name).toBe('luigi');
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
    expect(component.filteredItems.length).toBe(3);
  });

  it('should return all items when search contains only whitespace', () => {
    component.onSearchChange('   ');
    expect(component.filteredItems.length).toBe(3);
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
    expect(itemElements.length).toBe(3);
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
    const searchInput = fixture.debugElement.query(By.css('.search-input')).nativeElement;
    
    searchInput.value = 'luigi';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(component.filteredItems.length).toBe(1);
    expect(component.filteredItems[0].name).toBe('luigi');
  });

});
