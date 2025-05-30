import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ItemComponent } from './item.component';

describe('ItemComponent: testing basic component creation', () => {
   let component: ItemComponent;
   let fixture: ComponentFixture<ItemComponent>;

   /*
   - Using beforeEach to ensure setup completes before each test
   - configureTestingModule: configures and injects dependencies for the component under test
   - If the component used a service, we would include it in the providers section
   */
   beforeEach(async () => {
      /* TESTBED
      - Main API for writing unit tests for Angular applications and libraries
      - Creates an Angular test module (a @NgModule class) configured with configureTestingModule
      - Separates the component from its own application module and connects it to a 
        dynamically-built Angular test module specifically tailored for these tests */
      await TestBed.configureTestingModule({
         declarations: [ItemComponent],
         schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add schema to ignore unknown elements
      })
         .compileComponents();
   });

   /*
    Creates a component fixture instance using TestBed,
    which will handle injecting the dependencies defined earlier via configureTestingModule
    */
   beforeEach(() => {
      fixture = TestBed.createComponent(ItemComponent);
      /* To reference the component itself from the fixture, use componentInstance;
      since fixture provides more methods and parameters besides the component itself */
      component = fixture.componentInstance;

      component.name = 'Test Item';
      component.description = 'Test Description';
      component.price = '10.00';

      /*
      - Calling detectChanges() tells TestBed to perform data binding
      - Essential for tests, will error if not present
      - Official documentation: Delayed change detection is intentional and useful.
        It gives the tester an opportunity to inspect and change the state of the component before Angular
        initiates data binding and calls lifecycle hooks */
      fixture.detectChanges();
   });

   test('should create', () => {
      expect(component).toBeTruthy();
   });

   test('should call like method when button is clicked', () => {
      const likeSpy = jest.spyOn(component, 'like');
      
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      
      expect(likeSpy).toHaveBeenCalled();
   });
});
