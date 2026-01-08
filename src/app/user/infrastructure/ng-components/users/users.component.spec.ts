import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

import { UsersComponent } from './users.component';

describe('UsersComponent: testing calling a service from a component.', () => {
   let component: UsersComponent;
   let fixture: ComponentFixture<UsersComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [UsersComponent],
         imports: [HttpClientModule, MatButtonModule]
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
      const users = ['foo', 'bar', 'mario'];
      spyOn(component.usersServices, 'getUsers').and.returnValue(of({users: users}));
      
      component.getUsers();

      expect(component.users).toEqual({users});
   });

   it('should have empty users array initially', () => {
      expect(component.users).toEqual([]);
   });

   it('should call console.info when getUsers() is called', () => {
      spyOn(console, 'info');
      spyOn(component.usersServices, 'getUsers').and.returnValue(of([]));
      
      component.getUsers();
      
      expect(console.info).toHaveBeenCalledWith('getUsers');
   });
});

describe('UsersComponent: testing button interaction', () => {
   let component: UsersComponent;
   let fixture: ComponentFixture<UsersComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [UsersComponent],
         imports: [HttpClientModule, MatButtonModule]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(UsersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should call getUsers() when button is clicked', () => {
      spyOn(component, 'getUsers');
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      expect(component.getUsers).toHaveBeenCalled();
   });

   it('should update users array when button is clicked and service returns data', () => {
      const mockUsers = [
         { id: 1, name: 'John Doe' },
         { id: 2, name: 'Jane Doe' }
      ];
      spyOn(component.usersServices, 'getUsers').and.returnValue(of(mockUsers));
      
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      
      expect(component.users).toEqual(mockUsers);
   });
});

describe('UsersComponent: testing template rendering', () => {
   let component: UsersComponent;
   let fixture: ComponentFixture<UsersComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [UsersComponent],
         imports: [HttpClientModule, MatButtonModule]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(UsersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should render "users works!" text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('p')?.textContent).toContain('users works!');
   });

   it('should render user names in list when users are loaded', () => {
      component.users = [
         { id: 1, name: 'Alice' },
         { id: 2, name: 'Bob' }
      ];
      fixture.detectChanges();
      
      const listItems = fixture.debugElement.queryAll(By.css('li'));
      expect(listItems.length).toBe(2);
      expect(listItems[0].nativeElement.textContent).toContain('Alice');
      expect(listItems[1].nativeElement.textContent).toContain('Bob');
   });

   it('should render empty list when no users', () => {
      component.users = [];
      fixture.detectChanges();
      
      const listItems = fixture.debugElement.queryAll(By.css('li'));
      expect(listItems.length).toBe(0);
   });

   it('should have a Get Users button', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button).toBeTruthy();
      expect(button.nativeElement.textContent).toContain('Get Users');
   });
});
