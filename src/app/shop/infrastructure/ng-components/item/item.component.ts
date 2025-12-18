import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatIconModule]
})
export class ItemComponent implements OnInit {

   @Input() name: String;
   @Input() description: String;
   @Input() price: String;

   constructor() { }

   ngOnInit(): void {
   }

   like() {
      console.info('like ' + this.name);
   }

}
