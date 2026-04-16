import { Component, OnInit } from '@angular/core';
import { Item } from '../../../domain/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];
  filteredItems: Item[] = [];
  searchQuery: string = '';

  constructor() { }

  ngOnInit(): void {
    this.initializeItems();
    this.filteredItems = [...this.items];
  }

  private initializeItems() {
    this.items = [
      { name: 'foo', description: 'bar', price: '123' },
      { name: 'mario', description: 'bross', price: '456' },
      { name: 'luigi', description: 'bross', price: '789' }
    ];
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.filterItems();
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
  }

}
