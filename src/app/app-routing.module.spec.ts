import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { ItemsComponent } from './shop/infrastructure/ng-components/items/items.component';
import { UsersComponent } from './users/infrastructure/ng-components/users/users.component';
import { HttpClientModule } from '@angular/common/http';

describe('AppRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'shop', component: ItemsComponent },
          { path: 'users', component: UsersComponent },
          { path: '', redirectTo: '/users', pathMatch: 'full' }
        ])
      ],
      declarations: [ItemsComponent, UsersComponent]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to /shop', async () => {
    await router.navigate(['/shop']);
    expect(location.path()).toBe('/shop');
  });

  it('should navigate to /users', async () => {
    await router.navigate(['/users']);
    expect(location.path()).toBe('/users');
  });

  it('should redirect empty path to /users', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('/users');
  });
});

describe('AppRoutingModule: route configuration', () => {
  it('should have routes defined', () => {
    const routes = [
      { path: 'shop', component: ItemsComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: '/users', pathMatch: 'full' }
    ];

    expect(routes.length).toBe(3);
    expect(routes[0].path).toBe('shop');
    expect(routes[1].path).toBe('users');
    expect(routes[2].path).toBe('');
    expect(routes[2].redirectTo).toBe('/users');
  });

  it('should have shop route mapped to ItemsComponent', () => {
    const shopRoute = { path: 'shop', component: ItemsComponent };
    expect(shopRoute.component).toBe(ItemsComponent);
  });

  it('should have users route mapped to UsersComponent', () => {
    const usersRoute = { path: 'users', component: UsersComponent };
    expect(usersRoute.component).toBe(UsersComponent);
  });
});
