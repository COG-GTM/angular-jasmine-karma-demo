import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ItemComponent } from './item.component';

describe('ItemComponent: testing basic component creation', () => {
   let component: ItemComponent;
   let fixture: ComponentFixture<ItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [ItemComponent],
         imports: [MatCardModule, MatIconModule]
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
         declarations: [ItemComponent],
         imports: [MatCardModule, MatIconModule]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(ItemComponent);
      component = fixture.componentInstance;
   });

   it('should accept name input', () => {
      component.name = 'Test Item';
      fixture.detectChanges();
      expect(component.name).toBe('Test Item');
   });

   it('should accept description input', () => {
      component.description = 'Test Description';
      fixture.detectChanges();
      expect(component.description).toBe('Test Description');
   });

   it('should accept price input', () => {
      component.price = '99.99';
      fixture.detectChanges();
      expect(component.price).toBe('99.99');
   });

   it('should render name in the template', () => {
      component.name = 'Rendered Name';
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('mat-card-title')?.textContent).toContain('Rendered Name');
   });

   it('should render price in the template', () => {
      component.price = '123.45';
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('mat-card-content')?.textContent).toContain('123.45');
   });

   it('should render description in the template', () => {
      component.description = 'My Description';
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('mat-card-content')?.textContent).toContain('My Description');
   });
});

describe('ItemComponent: testing like() method', () => {
   let component: ItemComponent;
   let fixture: ComponentFixture<ItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [ItemComponent],
         imports: [MatCardModule, MatIconModule]
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

   it('should call like() when like button is clicked', () => {
      spyOn(component, 'like');
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      expect(component.like).toHaveBeenCalled();
   });

   it('should log correct item name when like button is clicked', () => {
      spyOn(console, 'info');
      component.name = 'Special Item';
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      expect(console.info).toHaveBeenCalledWith('like Special Item');
   });
});
