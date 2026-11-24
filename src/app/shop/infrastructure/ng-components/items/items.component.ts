import { Component, OnInit, signal } from '@angular/core';
import { Item } from '../../../domain/item.model';
import { ItemComponent } from '../item/item.component';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
    imports: [ItemComponent]
})
export class ItemsComponent implements OnInit {
  readonly items = signal<Item[]>([
    { name: 'foo', description: 'bar', price: '123' },
    { name: 'mario', description: 'bross', price: '456' },
    { name: 'luigi', description: 'bross', price: '789' },
    { name: 'apple', description: 'fruit', price: '99' },
    { name: 'banana', description: 'fruit', price: '59' }
  ]);

  readonly sortBy = signal('name');
  readonly sortOrder = signal<'asc' | 'desc'>('asc');

  constructor() { }

  ngOnInit(): void {
  }

  sortItems(field: string): void {
    if (this.sortBy() === field) {
      this.sortOrder.update(order => order === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set(field);
      this.sortOrder.set('asc');
    }
    this.applySort();
  }

  private applySort(): void {
    const sortBy = this.sortBy() as keyof Item;
    const sortOrder = this.sortOrder();
    this.items.update(items => [...items].sort((a, b) => {
      let comparison = 0;
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else {
        comparison = aValue > bValue ? 1 : -1;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    }));
  }

}
