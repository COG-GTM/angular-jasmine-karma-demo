import { Component, OnInit } from '@angular/core';
import { ItemComponent } from '../item/item.component';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
    standalone: true,
    imports: [ItemComponent]
})
export class ItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
