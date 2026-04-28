import { Component, OnInit } from '@angular/core';
import { Item } from '../../../domain/item.model';

export interface SortOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];
  filteredItems: Item[] = [];
  searchQuery: string = '';
  selectedSort: string = 'name-asc';
  
  sortOptions: SortOption[] = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.initializeItems();
    this.filteredItems = [...this.items];
    this.applySort();
  }

  private initializeItems() {
    this.items = [
      { name: 'foo', description: 'bar', price: '123' },
      { name: 'mario', description: 'bross', price: '456' },
      { name: 'luigi', description: 'bross', price: '789' },
      { name: 'peach', description: 'princess', price: '999' },
      { name: 'toad', description: 'mushroom', price: '111' },
      { name: 'yoshi', description: 'dinosaur', price: '555' }
    ];
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.filterItems();
  }

  onSortChange(sortValue: string) {
    this.selectedSort = sortValue;
    this.applySort();
  }

  private filterItems() {
    if (!this.searchQuery.trim()) {
      this.filteredItems = [...this.items];
    } else {
      const lowerQuery = this.searchQuery.toLowerCase();
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
      );
    }
    this.applySort();
  }

  private applySort() {
    const [field, direction] = this.selectedSort.split('-');
    
    this.filteredItems.sort((a, b) => {
      let comparison = 0;
      
      if (field === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (field === 'price') {
        comparison = parseFloat(a.price) - parseFloat(b.price);
      }
      
      return direction === 'desc' ? comparison * -1 : comparison;
    });
  }

}
