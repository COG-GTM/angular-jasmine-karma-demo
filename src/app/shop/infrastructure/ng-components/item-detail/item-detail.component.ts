import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../domain/item.model';

@Component({
   selector: 'app-item-detail',
   standalone: false,
   templateUrl: './item-detail.component.html',
   styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

   @Input() item: Item;

   constructor() { }

   ngOnInit(): void {
   }

}
