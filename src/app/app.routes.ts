import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'shop', loadComponent: () => import('./shop/infrastructure/ng-components/items/items.component').then(m => m.ItemsComponent) },
    { path: 'users', loadComponent: () => import('./user/infrastructure/ng-components/users/users.component').then(m => m.UsersComponent) },
    { path: '',   redirectTo: '/shop', pathMatch: 'full' },
];
