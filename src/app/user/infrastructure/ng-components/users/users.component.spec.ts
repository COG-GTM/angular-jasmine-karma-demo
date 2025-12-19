import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

describe('UsersComponent: testing DOM rendering', () => {
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

   it('should have a Get Users button', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button).toBeTruthy();
      expect(button.nativeElement.textContent).toContain('Get Users');
   });

   it('should call getUsers when button is clicked', () => {
      spyOn(component, 'getUsers');
      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', null);
      expect(component.getUsers).toHaveBeenCalled();
   });

   it('should display users in a list after getUsers is called', () => {
      const mockUsers = [
         { name: 'John Doe' },
         { name: 'Jane Smith' }
      ];
      spyOn(component.usersServices, 'getUsers').and.returnValue(of(mockUsers));
      
      component.getUsers();
      fixture.detectChanges();
      
      const listItems = fixture.debugElement.queryAll(By.css('li'));
      expect(listItems.length).toBe(2);
   });

   it('should display user names correctly', () => {
      const mockUsers = [
         { name: 'Alice' },
         { name: 'Bob' }
      ];
      spyOn(component.usersServices, 'getUsers').and.returnValue(of(mockUsers));
      
      component.getUsers();
      fixture.detectChanges();
      
      const listItems = fixture.debugElement.queryAll(By.css('li'));
      expect(listItems[0].nativeElement.textContent).toContain('Alice');
      expect(listItems[1].nativeElement.textContent).toContain('Bob');
   });

   it('should have empty users array initially', () => {
      expect(component.users).toEqual([]);
   });

   it('should display empty list when no users returned', () => {
      spyOn(component.usersServices, 'getUsers').and.returnValue(of([]));
      
      component.getUsers();
      fixture.detectChanges();
      
      const listItems = fixture.debugElement.queryAll(By.css('li'));
      expect(listItems.length).toBe(0);
   });
});

describe('UsersComponent: testing console logging', () => {
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

   it('should log to console when getUsers is called', () => {
      spyOn(console, 'info');
      spyOn(component.usersServices, 'getUsers').and.returnValue(of([]));
      
      component.getUsers();
      
      expect(console.info).toHaveBeenCalledWith('getUsers');
   });
});
