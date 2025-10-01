import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
   selector: 'app-item',
   standalone: true,
   imports: [MatCardModule, MatIconModule, MatButtonModule],
   templateUrl: './item.component.html',
   styleUrls: ['./item.component.scss']
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
