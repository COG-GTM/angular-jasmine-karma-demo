import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ItemComponent } from './item.component';

// Suite de tests para ItemComponent
describe('ItemComponent: testing @Input properties, like() method, and template rendering', () => {
   let component: ItemComponent;
   let fixture: ComponentFixture<ItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [ItemComponent],
         // Material modules required by the template:
         //   mat-card, mat-card-header, mat-card-title, mat-card-subtitle, mat-card-content → MatCardModule
         //   mat-icon → MatIconModule
         //   mat-icon-button (mat button directive) → MatButtonModule
         // NoopAnimationsModule prevents real animation timers from slowing tests
         imports: [
            NoopAnimationsModule,
            MatCardModule,
            MatIconModule,
            MatButtonModule,
         ],
      }).compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(ItemComponent);
      component = fixture.componentInstance;

      // Set baseline @Input values before the first detectChanges() call so that
      // data binding is applied to a fully-initialised component in every test.
      component.name        = 'Laptop Pro';
      component.description = 'High performance laptop';
      component.price       = '999';
      component.category    = 'Electronics';

      fixture.detectChanges();
   });

   // ─── 1. Creation ──────────────────────────────────────────────────────────

   it('should create the component', () => {
      expect(component).toBeTruthy();
   });

   // ─── 2. @Input: name ──────────────────────────────────────────────────────

   it('should receive the name @Input and render it in the template', () => {
      // component-class assertion
      expect(component.name).toBe('Laptop Pro');

      // DOM assertion – mat-card-title contains the name
      const titleEl: HTMLElement = fixture.debugElement
         .query(By.css('mat-card-title'))
         .nativeElement;
      expect(titleEl.textContent).toContain('Laptop Pro');
   });

   // ─── 3. @Input: description ───────────────────────────────────────────────

   it('should receive the description @Input and render it in the template', () => {
      expect(component.description).toBe('High performance laptop');

      const descEl: HTMLElement = fixture.debugElement
         .query(By.css('p.description'))
         .nativeElement;
      expect(descEl.textContent).toContain('High performance laptop');
   });

   // ─── 4. @Input: price ─────────────────────────────────────────────────────

   it('should receive the price @Input and render it with the € symbol', () => {
      expect(component.price).toBe('999');

      // Template renders "{{ price }} €"
      const priceEl: HTMLElement = fixture.debugElement
         .query(By.css('p.price'))
         .nativeElement;
      expect(priceEl.textContent).toContain('999');
      expect(priceEl.textContent).toContain('€');
   });

   // ─── 5. @Input: category (conditional rendering via *ngIf) ────────────────

   it('should receive the category @Input and render the subtitle when category is set', () => {
      // category is truthy → subtitle should be present
      const subtitleEl = fixture.debugElement.query(By.css('mat-card-subtitle'));
      expect(subtitleEl).not.toBeNull();
      expect(subtitleEl.nativeElement.textContent).toContain('Electronics');
   });

   it('should NOT render the subtitle when category is falsy (empty string)', () => {
      component.category = '';
      fixture.detectChanges();

      // *ngIf="category" is false → element must be absent from the DOM
      const subtitleEl = fixture.debugElement.query(By.css('mat-card-subtitle'));
      expect(subtitleEl).toBeNull();
   });

   // ─── 6. like() method ─────────────────────────────────────────────────────

   it('should call console.info with the item name when like() is invoked directly', () => {
      spyOn(console, 'info');

      component.like();

      expect(console.info).toHaveBeenCalledOnceWith('like Laptop Pro');
   });

   it('should call like() when the like button is clicked in the template', () => {
      spyOn(component, 'like');

      // The template wires (click)="like()" to the mat-icon-button
      const likeButton: HTMLElement = fixture.debugElement
         .query(By.css('button[aria-label="like"]'))
         .nativeElement;
      likeButton.click();

      expect(component.like).toHaveBeenCalledTimes(1);
   });

   // ─── 7. Edge cases ────────────────────────────────────────────────────────

   it('should handle undefined @Input values without throwing', () => {
      component.name        = undefined;
      component.description = undefined;
      component.price       = undefined;
      component.category    = undefined;

      // detectChanges() must not throw even with all inputs undefined
      expect(() => fixture.detectChanges()).not.toThrow();
   });

   it('should log "like undefined" when like() is called with name as undefined', () => {
      component.name = undefined;
      fixture.detectChanges();

      spyOn(console, 'info');
      component.like();

      // String concatenation: 'like ' + undefined → 'like undefined'
      expect(console.info).toHaveBeenCalledOnceWith('like undefined');
   });
});
