import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UsersServices } from './UsersServices';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// TODO: test sin terminar
describe('UsersServices', () => {
  let service: UsersServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(UsersServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
