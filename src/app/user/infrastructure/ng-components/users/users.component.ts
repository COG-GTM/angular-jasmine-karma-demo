import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UsersServices } from '../../../application/UsersServices';

@Component({
   selector: 'app-users',
   standalone: true,
   imports: [CommonModule, MatButtonModule],
   templateUrl: './users.component.html',
   styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

   users:any = [];

   constructor(public usersServices: UsersServices) { }

   ngOnInit(): void {
   }

   getUsers() {
      console.info('getUsers');
      this.usersServices.getUsers().subscribe(users => {this.users = users});
   }
}
