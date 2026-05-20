import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

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
   });

   it('getUsers() should handle empty user list', () => {
      const users = [];
      spyOn(component.usersServices, 'getUsers').and.returnValue(of({users: users}));
      
      component.getUsers();
      expect(component.users).toEqual({users});
   });

   it('getUsers() should log to console when called', () => {
      spyOn(console, 'info');
      const users = ['foo', 'bar'];
      spyOn(component.usersServices, 'getUsers').and.returnValue(of({users: users}));
      
      component.getUsers();
      expect(console.info).toHaveBeenCalledWith('getUsers');
   });

   it('should render users works text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('users works!');
   });

   it('should have a Get Users button', () => {
      const button = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(button).toBeTruthy();
      expect(button.textContent).toContain('Get Users');
   });

   it('should call getUsers when button is clicked', () => {
      spyOn(component, 'getUsers');
      const button = fixture.debugElement.query(By.css('button')).nativeElement;
      button.click();
      expect(component.getUsers).toHaveBeenCalledTimes(1);
   });

   it('should initialize with empty users array', () => {
      expect(component.users).toEqual([]);
   });

   it('should render user list when users are loaded', () => {
      const users = [{name: 'User1'}, {name: 'User2'}];
      spyOn(component.usersServices, 'getUsers').and.returnValue(of({users: users}));
      
      component.getUsers();
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('User1');
      expect(compiled.textContent).toContain('User2');
   });
});