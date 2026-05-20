import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './shop/infrastructure/ng-components/items/items.component'
import { UsersComponent } from './user/infrastructure/ng-components/users/users.component'

const routes: Routes = [
    { path: 'shop', component: ItemsComponent },
    { path: 'users', component: UsersComponent },
    { path: '',   redirectTo: '/shop', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
