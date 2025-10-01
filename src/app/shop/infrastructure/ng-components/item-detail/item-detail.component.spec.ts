import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Item } from '../../../domain/item.model';
import { ItemDetailComponent } from './item-detail.component';

describe('ItemDetailComponent: testing @Input from parent', () => {
   let component: ItemDetailComponent;
   let fixture: ComponentFixture<ItemDetailComponent>;
   let itemInput: Item;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [ItemDetailComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(ItemDetailComponent);
      component = fixture.componentInstance;

      // pretend that it was wired to something that supplied an Item
      itemInput = { 'name': 'foo', 'description': 'bar', 'price': '33' };
      component.item = itemInput;

      // trigger initial data binding
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should get the name param value from @Input', () => {
      expect(component.item.name).toContain(itemInput.name);
   });
   it('should get the description param value from @Input', () => {
      expect(component.item.description).toContain(itemInput.description);
   });
   it('should get the price param value from @Input', () => {
      expect(component.item.price).toContain(itemInput.price);
   });
});
