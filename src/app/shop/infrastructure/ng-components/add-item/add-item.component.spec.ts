import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { AddItemComponent } from './add-item.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('AddItemComponent: testing form validation', () => {
   let component: AddItemComponent;
   let fixture: ComponentFixture<AddItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [AddItemComponent],
         imports: [
            FormsModule,
            ReactiveFormsModule,
            NoopAnimationsModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            MatButtonModule
         ]
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

   it('form should be invalid when empty', () => {
      component.form.controls['name'].setValue('');
      component.form.controls['description'].setValue('');
      component.form.controls['price'].setValue('');
      expect(component.form.valid).toBeFalsy();
   });

   it('form should be valid when all fields are filled', () => {
      component.form.controls['name'].setValue('foo');
      component.form.controls['description'].setValue('bar');
      component.form.controls['price'].setValue('33');
      expect(component.form.valid).toBeTruthy();
   });

   it('form should be invalid when only name is filled', () => {
      component.form.controls['name'].setValue('foo');
      component.form.controls['description'].setValue('');
      component.form.controls['price'].setValue('');
      expect(component.form.valid).toBeFalsy();
   });

   it('form should be invalid when only description is filled', () => {
      component.form.controls['name'].setValue('');
      component.form.controls['description'].setValue('bar');
      component.form.controls['price'].setValue('');
      expect(component.form.valid).toBeFalsy();
   });

   it('form should be invalid when only price is filled', () => {
      component.form.controls['name'].setValue('');
      component.form.controls['description'].setValue('');
      component.form.controls['price'].setValue('33');
      expect(component.form.valid).toBeFalsy();
   });

   it('name field should be required', () => {
      const nameControl = component.form.controls['name'];
      expect(nameControl.valid).toBeFalsy();
      nameControl.setValue('');
      expect(nameControl.hasError('required')).toBeTruthy();
   });

   it('description field should be required', () => {
      const descriptionControl = component.form.controls['description'];
      expect(descriptionControl.valid).toBeFalsy();
      descriptionControl.setValue('');
      expect(descriptionControl.hasError('required')).toBeTruthy();
   });

   it('price field should be required', () => {
      const priceControl = component.form.controls['price'];
      expect(priceControl.valid).toBeFalsy();
      priceControl.setValue('');
      expect(priceControl.hasError('required')).toBeTruthy();
   });

   it('button save should not call saveItem when form is invalid', () => {
      // Jasmine feature that allows dynamically intercepting the calls to a function
      spyOn(component, 'saveItem');
      let saveItemButton = fixture.debugElement.query(By.css('button')).nativeElement;
      saveItemButton.click();
      expect(component.saveItem).toHaveBeenCalledTimes(0); // remember: button is disabled if form is invalid
   });

   it('button save should call saveItem when form is valid', () => {
      let saveItemButton = fixture.debugElement.query(By.css('button')).nativeElement;
      spyOn(component, 'saveItem');
      
      component.form.controls['name'].setValue('foo');
      component.form.controls['description'].setValue('bar');
      component.form.controls['price'].setValue('33');
      fixture.detectChanges();

      saveItemButton.click();
      expect(component.saveItem).toHaveBeenCalledTimes(1);
   });

   it('saveItem method should log to console', () => {
      spyOn(console, 'info');
      component.saveItem();
      expect(console.info).toHaveBeenCalledWith('saveItem');
   });

   it('button should be disabled when form is invalid', () => {
      const saveButton = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(saveButton.disabled).toBeTruthy();
   });

   it('button should be enabled when form is valid', () => {
      component.form.controls['name'].setValue('foo');
      component.form.controls['description'].setValue('bar');
      component.form.controls['price'].setValue('33');
      fixture.detectChanges();
      
      const saveButton = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(saveButton.disabled).toBeFalsy();
   });
});