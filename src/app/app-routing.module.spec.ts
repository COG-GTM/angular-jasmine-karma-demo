import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ItemsComponent } from 'src/app/shop/infrastructure/ng-components/items/items.component';
import { UsersComponent } from 'src/app/user/infrastructure/ng-components/users/users.component';
import { HttpClientModule } from '@angular/common/http';

describe('AppRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'shop', component: ItemsComponent },
          { path: 'users', component: UsersComponent },
          { path: '', redirectTo: '/users', pathMatch: 'full' }
        ]),
        HttpClientModule
      ],
      declarations: [ItemsComponent, UsersComponent]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should create the routing module', () => {
    const module = new AppRoutingModule();
    expect(module).toBeTruthy();
  });

  it('should have shop route configured', async () => {
    const fixture = TestBed.createComponent(ItemsComponent);
    fixture.detectChanges();
    await router.navigate(['/shop']);
    expect(location.path()).toBe('/shop');
  });

  it('should have users route configured', async () => {
    const fixture = TestBed.createComponent(UsersComponent);
    fixture.detectChanges();
    await router.navigate(['/users']);
    expect(location.path()).toBe('/users');
  });

  it('should redirect empty path to users', async () => {
    const fixture = TestBed.createComponent(UsersComponent);
    fixture.detectChanges();
    await router.navigate(['']);
    expect(location.path()).toBe('/users');
  });
});

describe('AppRoutingModule: route definitions', () => {
  it('should define three routes', () => {
    const routes = [
      { path: 'shop', component: ItemsComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: '/users', pathMatch: 'full' }
    ];
    expect(routes.length).toBe(3);
  });

  it('should have shop route pointing to ItemsComponent', () => {
    const shopRoute = { path: 'shop', component: ItemsComponent };
    expect(shopRoute.path).toBe('shop');
    expect(shopRoute.component).toBe(ItemsComponent);
  });

  it('should have users route pointing to UsersComponent', () => {
    const usersRoute = { path: 'users', component: UsersComponent };
    expect(usersRoute.path).toBe('users');
    expect(usersRoute.component).toBe(UsersComponent);
  });

  it('should have default redirect to users', () => {
    const defaultRoute = { path: '', redirectTo: '/users', pathMatch: 'full' };
    expect(defaultRoute.path).toBe('');
    expect(defaultRoute.redirectTo).toBe('/users');
    expect(defaultRoute.pathMatch).toBe('full');
  });
});
