import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Item } from 'src/app/shop/domain/item.model';
import { ItemDetailComponent } from './item-detail.component';

describe('ItemDetailComponent: testing @Input from parent', () => {
   let component: ItemDetailComponent;
   let fixture: ComponentFixture<ItemDetailComponent>;
   let itemInput: Item;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [ItemDetailComponent]
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

   it('should handle null item input', () => {
      component.item = null as any;
      fixture.detectChanges();
      expect(component.item).toBeNull();
   });

   it('should handle undefined item input', () => {
      component.item = undefined as any;
      fixture.detectChanges();
      expect(component.item).toBeUndefined();
   });

   it('should accept item with different values', () => {
      const newItem = { 'name': 'new item', 'description': 'new description', 'price': '99' };
      component.item = newItem;
      fixture.detectChanges();
      expect(component.item.name).toEqual('new item');
      expect(component.item.description).toEqual('new description');
      expect(component.item.price).toEqual('99');
   });

   it('should render item-detail works text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('item-detail works!');
   });
});