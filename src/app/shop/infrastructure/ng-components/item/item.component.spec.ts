import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
         declarations: [ItemComponent],
         imports: [
            NoopAnimationsModule,
            MatCardModule,
            MatIconModule,
            MatButtonModule
         ]
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

   // Test for @Input properties - name
   it('should accept name input', () => {
      component.name = 'Test Item';
      fixture.detectChanges();
      expect(component.name).toEqual('Test Item');
   });

   // Test for @Input properties - description
   it('should accept description input', () => {
      component.description = 'Test Description';
      fixture.detectChanges();
      expect(component.description).toEqual('Test Description');
   });

   // Test for @Input properties - price
   it('should accept price input', () => {
      component.price = '100';
      fixture.detectChanges();
      expect(component.price).toEqual('100');
   });

   // Test for the like() method
   it('should call like() method', () => {
      spyOn(console, 'info');
      component.name = 'Test Item';
      component.like();
      expect(console.info).toHaveBeenCalledWith('like Test Item');
   });

   // Test for rendering name in the template
   it('should render name in the template', () => {
      component.name = 'Test Item';
      component.description = 'Test Description';
      component.price = '100';
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Test Item');
   });

   // Test for rendering price in the template
   it('should render price in the template', () => {
      component.name = 'Test Item';
      component.description = 'Test Description';
      component.price = '100';
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('100 €');
   });

   // Test for rendering description in the template
   it('should render description in the template', () => {
      component.name = 'Test Item';
      component.description = 'Test Description';
      component.price = '100';
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Test Description');
   });

   // Test for like button click
   it('should call like() when like button is clicked', () => {
      spyOn(component, 'like');
      component.name = 'Test Item';
      component.description = 'Test Description';
      component.price = '100';
      fixture.detectChanges();
      
      const likeButton = fixture.debugElement.query(By.css('button')).nativeElement;
      likeButton.click();
      expect(component.like).toHaveBeenCalledTimes(1);
   });
});