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
      spyOn(component, 'saveItem');
      let saveItemButton = fixture.debugElement.query(By.css('button')).nativeElement;
      saveItemButton.click();
      expect(component.saveItem).toHaveBeenCalledTimes(0);
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

   it('name field should be invalid when empty', () => {
      const nameControl = component.form.controls['name'];
      nameControl.setValue('');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.errors?.['required']).toBeTruthy();
   });

   it('name field should be valid when filled', () => {
      const nameControl = component.form.controls['name'];
      nameControl.setValue('Test Product');
      expect(nameControl.valid).toBeTruthy();
   });

   it('description field should be invalid when empty', () => {
      const descriptionControl = component.form.controls['description'];
      descriptionControl.setValue('');
      expect(descriptionControl.valid).toBeFalsy();
      expect(descriptionControl.errors?.['required']).toBeTruthy();
   });

   it('description field should be valid when filled', () => {
      const descriptionControl = component.form.controls['description'];
      descriptionControl.setValue('This is a test description');
      expect(descriptionControl.valid).toBeTruthy();
   });

   it('price field should be invalid when empty', () => {
      const priceControl = component.form.controls['price'];
      priceControl.setValue('');
      expect(priceControl.valid).toBeFalsy();
      expect(priceControl.errors?.['required']).toBeTruthy();
   });

   it('price field should be valid when filled', () => {
      const priceControl = component.form.controls['price'];
      priceControl.setValue('99.99');
      expect(priceControl.valid).toBeTruthy();
   });

   it('form should be invalid when only name is filled', () => {
      component.form.controls['name'].setValue('Product Name');
      component.form.controls['description'].setValue('');
      component.form.controls['price'].setValue('');
      expect(component.form.valid).toBeFalsy();
   });

   it('form should be invalid when only description is filled', () => {
      component.form.controls['name'].setValue('');
      component.form.controls['description'].setValue('Product Description');
      component.form.controls['price'].setValue('');
      expect(component.form.valid).toBeFalsy();
   });

   it('form should be invalid when only price is filled', () => {
      component.form.controls['name'].setValue('');
      component.form.controls['description'].setValue('');
      component.form.controls['price'].setValue('50');
      expect(component.form.valid).toBeFalsy();
   });
});

describe('AddItemComponent: testing formInit and saveItem methods', () => {
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

   it('should initialize form on ngOnInit', () => {
      expect(component.form).toBeDefined();
      expect(component.form.controls['name']).toBeDefined();
      expect(component.form.controls['description']).toBeDefined();
      expect(component.form.controls['price']).toBeDefined();
   });

   it('formInit should create form with required validators', () => {
      component.formInit();
      expect(component.form.controls['name'].validator).toBeTruthy();
      expect(component.form.controls['description'].validator).toBeTruthy();
      expect(component.form.controls['price'].validator).toBeTruthy();
   });

   it('saveItem should call console.info', () => {
      spyOn(console, 'info');
      component.saveItem();
      expect(console.info).toHaveBeenCalledWith('saveItem');
   });

   it('form should have three controls', () => {
      const formControls = Object.keys(component.form.controls);
      expect(formControls.length).toBe(3);
      expect(formControls).toContain('name');
      expect(formControls).toContain('description');
      expect(formControls).toContain('price');
   });
});
