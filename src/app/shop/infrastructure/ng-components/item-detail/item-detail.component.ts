import { Component, OnInit, input } from '@angular/core';
import { Item } from '../../../domain/item.model';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

   readonly item = input<Item>();

   constructor() { }

   ngOnInit(): void {
   }

}
