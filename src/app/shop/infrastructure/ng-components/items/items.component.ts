import { Component, OnInit } from '@angular/core';
import { Item } from '../../../domain/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [
    { name: 'foo', description: 'bar', price: '123' },
    { name: 'mario', description: 'bross', price: '456' },
    { name: 'luigi', description: 'bross', price: '789' }
  ];

  sortCriteria: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() { }

  ngOnInit(): void {
    this.sortItems();
  }

  sortItems(): void {
    this.items.sort((a, b) => {
      let comparison = 0;
      
      if (this.sortCriteria === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (this.sortCriteria === 'price') {
        comparison = parseFloat(a.price) - parseFloat(b.price);
      } else if (this.sortCriteria === 'description') {
        comparison = a.description.localeCompare(b.description);
      }
      
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  onSortChange(criteria: string): void {
    if (this.sortCriteria === criteria) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortCriteria = criteria;
      this.sortDirection = 'asc';
    }
    this.sortItems();
  }

}
