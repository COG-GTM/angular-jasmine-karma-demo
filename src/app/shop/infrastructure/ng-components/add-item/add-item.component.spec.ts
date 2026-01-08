import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { AddItemComponent } from './add-item.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AddItemComponent: testing form validation', () => {
   let component: AddItemComponent;
   let fixture: ComponentFixture<AddItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [AddItemComponent],
         imports: [FormsModule, ReactiveFormsModule]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(AddItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('form should be invalid', () => {
      component.form.controls['name'].setValue('');
      component.form.controls['description'].setValue('');
      component.form.controls['price'].setValue('');
      expect(component.form.valid).toBeFalsy();
   });
   it('form should be valid', () => {
      component.form.controls['name'].setValue('foo');
      component.form.controls['description'].setValue('bar');
      component.form.controls['price'].setValue('33');
      expect(component.form.valid).toBeTruthy();
   });
   it('button save should call the saveItem method???', () => {
      // Jasmine feature that allows dynamically intercepting the calls to a function
      spyOn(component, 'saveItem');
      let saveItemButton = fixture.debugElement.query(By.css('button')).nativeElement;
      saveItemButton.click();
      expect(component.saveItem).toHaveBeenCalledTimes(0); // remember: button is disabled if form is invalid
      //expect(saveItemButton.enabled).toBeFalsy(); // this also could work as a valid expect
      //expect(saveItemButton.disabled).toBeTruthy(); // this also could work as a valid expect
   });
   it('button save should be enabled', () => {
      let saveItemButton = fixture.debugElement.query(By.css('button')).nativeElement;
      spyOn(component, 'saveItem');
      
      component.form.controls['name'].setValue('foo');
      component.form.controls['description'].setValue('bar');
      component.form.controls['price'].setValue('33');
      fixture.detectChanges();

      saveItemButton.click();
      expect(component.saveItem).toHaveBeenCalledTimes(1);
   });
   
});

describe('AddItemComponent: testing individual field validation', () => {
   let component: AddItemComponent;
   let fixture: ComponentFixture<AddItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [AddItemComponent],
         imports: [FormsModule, ReactiveFormsModule]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(AddItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('name field should be required', () => {
      const nameControl = component.form.controls['name'];
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.errors?.['required']).toBeTruthy();
   });

   it('name field should be valid when filled', () => {
      const nameControl = component.form.controls['name'];
      nameControl.setValue('Test Item');
      expect(nameControl.valid).toBeTruthy();
   });

   it('description field should be required', () => {
      const descriptionControl = component.form.controls['description'];
      expect(descriptionControl.valid).toBeFalsy();
      expect(descriptionControl.errors?.['required']).toBeTruthy();
   });

   it('description field should be valid when filled', () => {
      const descriptionControl = component.form.controls['description'];
      descriptionControl.setValue('Test Description');
      expect(descriptionControl.valid).toBeTruthy();
   });

   it('price field should be required', () => {
      const priceControl = component.form.controls['price'];
      expect(priceControl.valid).toBeFalsy();
      expect(priceControl.errors?.['required']).toBeTruthy();
   });

   it('price field should be valid when filled', () => {
      const priceControl = component.form.controls['price'];
      priceControl.setValue('99.99');
      expect(priceControl.valid).toBeTruthy();
   });

   it('form should be invalid when only name is filled', () => {
      component.form.controls['name'].setValue('Test');
      expect(component.form.valid).toBeFalsy();
   });

   it('form should be invalid when only description is filled', () => {
      component.form.controls['description'].setValue('Test');
      expect(component.form.valid).toBeFalsy();
   });

   it('form should be invalid when only price is filled', () => {
      component.form.controls['price'].setValue('99');
      expect(component.form.valid).toBeFalsy();
   });
});

describe('AddItemComponent: testing formInit() method', () => {
   let component: AddItemComponent;
   let fixture: ComponentFixture<AddItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [AddItemComponent],
         imports: [FormsModule, ReactiveFormsModule]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(AddItemComponent);
      component = fixture.componentInstance;
   });

   it('should initialize form on ngOnInit', () => {
      expect(component.form).toBeUndefined();
      component.ngOnInit();
      expect(component.form).toBeDefined();
   });

   it('should create form with three controls', () => {
      component.ngOnInit();
      expect(Object.keys(component.form.controls).length).toBe(3);
   });

   it('should create form with name, description, and price controls', () => {
      component.ngOnInit();
      expect(component.form.controls['name']).toBeDefined();
      expect(component.form.controls['description']).toBeDefined();
      expect(component.form.controls['price']).toBeDefined();
   });

   it('formInit should reset form values', () => {
      component.ngOnInit();
      component.form.controls['name'].setValue('Test');
      component.formInit();
      expect(component.form.controls['name'].value).toBe('');
   });
});

describe('AddItemComponent: testing saveItem() method', () => {
   let component: AddItemComponent;
   let fixture: ComponentFixture<AddItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [AddItemComponent],
         imports: [FormsModule, ReactiveFormsModule]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(AddItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should call console.info when saveItem() is called', () => {
      spyOn(console, 'info');
      component.saveItem();
      expect(console.info).toHaveBeenCalledWith('saveItem');
   });

   it('saveItem should be callable', () => {
      expect(() => component.saveItem()).not.toThrow();
   });
});
