import { Component, OnInit } from '@angular/core';
import { UsersServices } from 'src/app/users/application/UsersServices';

@Component({
   selector: 'app-users',
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
