import { Component, OnInit } from '@angular/core';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
