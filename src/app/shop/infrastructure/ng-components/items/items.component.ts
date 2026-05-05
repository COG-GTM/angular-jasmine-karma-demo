import { Component, OnInit } from '@angular/core';
import { Item } from '../../../domain/item.model';

export type SortField = 'name' | 'price' | 'category';
export type SortOrder = 'asc' | 'desc';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [
    { name: 'Gaming Laptop', description: 'High performance laptop for gaming', price: '1299', category: 'Electronics' },
    { name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: '29', category: 'Electronics' },
    { name: 'Coffee Maker', description: 'Automatic coffee maker with timer', price: '89', category: 'Appliances' },
    { name: 'Desk Chair', description: 'Comfortable office chair', price: '199', category: 'Furniture' },
    { name: 'Headphones', description: 'Noise-cancelling headphones', price: '149', category: 'Electronics' },
    { name: 'Bookshelf', description: 'Wooden bookshelf with 5 shelves', price: '79', category: 'Furniture' },
    { name: 'Blender', description: 'High-speed blender for smoothies', price: '49', category: 'Appliances' },
    { name: 'Monitor', description: '27-inch 4K monitor', price: '399', category: 'Electronics' }
  ];

  filterText: string = '';
  selectedCategory: string = '';
  sortField: SortField = 'name';
  sortOrder: SortOrder = 'asc';

  categories: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.extractCategories();
  }

  extractCategories(): void {
    this.categories = [...new Set(this.items.map(item => item.category).filter((cat): cat is string => Boolean(cat)))];
  }

  get filteredAndSortedItems(): Item[] {
    let filteredItems = this.items;

    // Apply text filter
    if (this.filterText) {
      const searchTerm = this.filterText.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.price.toLowerCase().includes(searchTerm) ||
        (item.category && item.category.toLowerCase().includes(searchTerm))
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filteredItems = filteredItems.filter(item => item.category === this.selectedCategory);
    }

    // Apply sorting
    return this.sortItems(filteredItems);
  }

  sortItems(items: Item[]): Item[] {
    return [...items].sort((a, b) => {
      let aValue: string = a[this.sortField] || '';
      let bValue: string = b[this.sortField] || '';

      // Special handling for price to sort numerically
      if (this.sortField === 'price') {
        aValue = aValue.replace(/[^0-9.]/g, '');
        bValue = bValue.replace(/[^0-9.]/g, '');
        const aNum = parseFloat(aValue) || 0;
        const bNum = parseFloat(bValue) || 0;
        return this.sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
      }

      // String comparison for other fields
      const comparison = aValue.localeCompare(bValue);
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  onSortChange(field: SortField): void {
    if (this.sortField === field) {
      // Toggle order if same field
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Change field and reset order to asc
      this.sortField = field;
      this.sortOrder = 'asc';
    }
  }

  onCategoryChange(): void {
    // This will trigger the getter to recompute
  }

  clearFilters(): void {
    this.filterText = '';
    this.selectedCategory = '';
    this.sortField = 'name';
    this.sortOrder = 'asc';
  }

}
