import { Component, OnInit, input } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatIconButton, MatIcon]
})
export class ItemComponent implements OnInit {

   readonly name = input<String>();
   readonly description = input<String>();
   readonly price = input<String>();

   constructor() { }

   ngOnInit(): void {
   }

   like() {
      console.info('like ' + this.name());
   }

}
