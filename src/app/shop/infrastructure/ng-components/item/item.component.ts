import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'app-item',
   templateUrl: './item.component.html',
   styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

   @Input() name: String;
   @Input() description: String;
   @Input() price: number;

   constructor() { }

   ngOnInit(): void {
   }

   like() {
      console.info('like ' + this.name);
   }

}
