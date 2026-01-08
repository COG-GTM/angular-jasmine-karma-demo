import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';

describe('ItemComponent: testing basic component creation', () => {
   let component: ItemComponent;
   let fixture: ComponentFixture<ItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [ItemComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(ItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});

describe('ItemComponent: testing @Input properties', () => {
   let component: ItemComponent;
   let fixture: ComponentFixture<ItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [ItemComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(ItemComponent);
      component = fixture.componentInstance;
   });

   it('should accept name input', () => {
      const testName = 'Test Product';
      component.name = testName;
      fixture.detectChanges();
      expect(component.name).toBe(testName);
   });

   it('should accept description input', () => {
      const testDescription = 'This is a test product description';
      component.description = testDescription;
      fixture.detectChanges();
      expect(component.description).toBe(testDescription);
   });

   it('should accept price input', () => {
      const testPrice = '99.99';
      component.price = testPrice;
      fixture.detectChanges();
      expect(component.price).toBe(testPrice);
   });

   it('should accept all inputs together', () => {
      component.name = 'Complete Product';
      component.description = 'Full description';
      component.price = '149.99';
      fixture.detectChanges();
      
      expect(component.name).toBe('Complete Product');
      expect(component.description).toBe('Full description');
      expect(component.price).toBe('149.99');
   });
});

describe('ItemComponent: testing like() method', () => {
   let component: ItemComponent;
   let fixture: ComponentFixture<ItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [ItemComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(ItemComponent);
      component = fixture.componentInstance;
      component.name = 'Test Item';
      fixture.detectChanges();
   });

   it('should call console.info when like() is called', () => {
      spyOn(console, 'info');
      component.like();
      expect(console.info).toHaveBeenCalledWith('like Test Item');
   });

   it('should include item name in console output', () => {
      component.name = 'Special Product';
      spyOn(console, 'info');
      component.like();
      expect(console.info).toHaveBeenCalledWith('like Special Product');
   });
});
