import { Routes } from '@angular/router';
import { ItemsComponent } from './shop/infrastructure/ng-components/items/items.component';
import { UsersComponent } from './user/infrastructure/ng-components/users/users.component';

export const routes: Routes = [
  { path: 'shop', component: ItemsComponent },
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];
