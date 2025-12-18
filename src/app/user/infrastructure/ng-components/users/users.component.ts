import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersServices } from 'src/app/user/application/UsersServices';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    standalone: true,
    imports: [CommonModule]
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
