import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UsersComponent } from './users.component';

describe('UsersComponent: testing calling a service from a component.', () => {
   let component: UsersComponent;
   let fixture: ComponentFixture<UsersComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [UsersComponent],
         imports: [HttpClientModule]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(UsersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('getUsers() should return a list of users', () => {
      // 1º Arrange: we doubled the service
      /* The array to be returned by the service.
      Here we could also test the data structure thar we receibe from backend; for this test
      I've only added a string, but I could add objects with more fields.
       */
      const users = ['foo', 'bar', 'mario'];
      /* params:
      1 service to spy
      2 method to replace with the spy */
      spyOn(component.usersServices, 'getUsers').and.returnValue(of({users: users}));
      
      // 2º act: call the service
      component.getUsers();

       //3º assert: we expect to receibe an object with an array of users
      expect(component.users).toEqual({users});
   })
});
