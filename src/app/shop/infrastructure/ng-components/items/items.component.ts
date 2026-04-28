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

  filterText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  get filteredItems(): Item[] {
    if (!this.filterText) {
      return this.items;
    }
    const searchTerm = this.filterText.toLowerCase();
    return this.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.price.toLowerCase().includes(searchTerm)
    );
  }

}
