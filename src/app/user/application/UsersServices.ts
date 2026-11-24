import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UsersServices {
   private httpClient = inject(HttpClient);

   private url = "https://jsonplaceholder.typicode.com/users";

   getUsers() {
      return this.httpClient.get(this.url);
   }

}
