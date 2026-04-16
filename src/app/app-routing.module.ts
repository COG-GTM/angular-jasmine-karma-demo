import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from 'src/app/shop/infrastructure/ng-components/items/items.component'
import { UsersComponent } from 'src/app/users/infrastructure/ng-components/users/users.component'

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
