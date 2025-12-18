import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../domain/item.model';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.scss'],
    standalone: true,
    imports: []
})
export class ItemDetailComponent implements OnInit {

   @Input() item: Item;

   constructor() { }

   ngOnInit(): void {
   }

}
