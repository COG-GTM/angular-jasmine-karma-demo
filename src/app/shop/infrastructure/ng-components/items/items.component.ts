import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
import { Item } from '../../domain/item.model';
=======
import { Item } from '../../../domain/item.model';
>>>>>>> Stashed changes

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [
    { name: 'foo', description: 'bar', price: '123' },
    { name: 'mario', description: 'bross', price: '456' },
    { name: 'luigi', description: 'bross', price: '789' },
    { name: 'apple', description: 'fruit', price: '99' },
    { name: 'banana', description: 'fruit', price: '59' }
  ];

  sortBy: string = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';

  items: Item[] = [
    { name: 'foo', description: 'bar', price: '123' },
    { name: 'mario', description: 'bross', price: '456' },
    { name: 'luigi', description: 'bross', price: '789' }
  ];

  sortField: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() { }

  ngOnInit(): void {
  }

  sortItems(field: string): void {
<<<<<<< Updated upstream
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.applySort();
  }

  private applySort(): void {
    this.items.sort((a, b) => {
      let comparison = 0;
      const aValue = a[this.sortBy as keyof Item];
      const bValue = b[this.sortBy as keyof Item];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else {
        comparison = aValue > bValue ? 1 : -1;
      }

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

=======
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.items.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (this.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

>>>>>>> Stashed changes
}
