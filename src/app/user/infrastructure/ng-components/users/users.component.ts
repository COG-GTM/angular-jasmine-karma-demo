import { Component, OnInit } from '@angular/core';
import { UsersServices } from '../../../application/UsersServices';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    imports: [MatButton]
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
