import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UsersServices } from './UsersServices';

// TODO: test sin terminar
describe('UsersServices', () => {
  let service: UsersServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(UsersServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
