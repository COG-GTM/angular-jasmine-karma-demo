import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ItemComponent } from './item.component';

// Creamos la Suite de tests para este componente.
// los tests se ejecutan con el comando $ ng test
describe('ItemComponent: testing basic component creation', () => {
   // variable con el propio componente a testear
   let component: ItemComponent;
   // es el componente a testear pero añadiendo más información para que sea más fácil de testear.
   let fixture: ComponentFixture<ItemComponent>;

   /*
   - asíncrona para asegurarnos de que se termina de ejecutar antes de pasar un test
   - configureTestingModule: configura e inyecta dependecias al componente que queremos testear.
   - Si usáramos en el componente un servicio, habría que incluirlo también, creando una sección llamada providers.
   */
   beforeEach(async () => {
      /* TESTBED
      - es la API principal para escribir pruebas unitarias para aplicaciones y bibliotecas de Angular. 
      - Creo que dobla el componente, cómo el mount de jest => Crea un módulo de prueba angular (una clase @NgModule) 
      que se configura con el método configureTestingModule para producir el entorno del módulo para la clase
      que desea probar. Separa el componente a testear de su propio módulo de aplicación 
      y lo conecta a un módulo de prueba Angular de construcción dinámica adaptado específicamente para estas pruebas. */
      await TestBed.configureTestingModule({
         declarations: [ItemComponent]
      })
         .compileComponents();
   });

   /*
    Crea una instancia fixture del componente usando TestBed, 
    el cual se encargará de inyectar las dependencias definidas anteriormente mediante configureTestingModule. 
    */
   beforeEach(() => {
      fixture = TestBed.createComponent(ItemComponent);
      /* Para referenciar el componente en sí del fixture usa componentInstance;
      ya que fixture proporciona más metodos y parámetros a parte del propio componente. */
      component = fixture.componentInstance;

      /*
      - Al invocar detectChanges() le decimos a TestBed que realice el enlace de datos.
      - Es imprescindible para los tests, da error si no está.
      - Documentación oficial: Delayed change detection is intentional and useful. 
        It gives the tester an opportunity to inspect and change the state of the component before Angular 
        initiates data binding and calls lifecycle hooks. */
      fixture.detectChanges();

   });

   // Test para comprobar que el componente se crea correctamente
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
      component.name = 'Test Product';
      fixture.detectChanges();
      expect(component.name).toBe('Test Product');
   });

   it('should accept description input', () => {
      component.description = 'This is a test description';
      fixture.detectChanges();
      expect(component.description).toBe('This is a test description');
   });

   it('should accept price input', () => {
      component.price = '99.99';
      fixture.detectChanges();
      expect(component.price).toBe('99.99');
   });

   it('should display all input values correctly', () => {
      component.name = 'Test Product';
      component.description = 'Test Description';
      component.price = '49.99';
      fixture.detectChanges();

      expect(component.name).toBe('Test Product');
      expect(component.description).toBe('Test Description');
      expect(component.price).toBe('49.99');
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
      component.name = 'Test Product';
      fixture.detectChanges();
   });

   it('should call like() method when invoked', () => {
      spyOn(component, 'like').and.callThrough();
      component.like();
      expect(component.like).toHaveBeenCalled();
   });

   it('should log to console when like() is called', () => {
      spyOn(console, 'info');
      component.like();
      expect(console.info).toHaveBeenCalledWith('like Test Product');
   });

   it('should call like() when like button is clicked', () => {
      spyOn(component, 'like');
      const likeButton = fixture.debugElement.query(By.css('button'));
      likeButton.triggerEventHandler('click', null);
      expect(component.like).toHaveBeenCalled();
   });
});
