import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersServices } from './UsersServices';

describe('UsersServices', () => {
  let service: UsersServices;
  let httpMock: HttpTestingController;
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersServices]
    });
    
    service = TestBed.inject(UsersServices);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding HTTP requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be injected successfully', () => {
    expect(service).toBeInstanceOf(UsersServices);
    expect(httpMock).toBeDefined();
  });

  it('should make HTTP GET request to correct URL', () => {
    service.getUsers().subscribe();
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe('https://jsonplaceholder.typicode.com/users');
  });

  it('should return users data on successful HTTP call', () => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(2);
    });
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should handle 404 error gracefully', () => {
    service.getUsers().subscribe({
      next: () => fail('Should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    });
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

  it('should handle 500 server error gracefully', () => {
    service.getUsers().subscribe({
      next: () => fail('Should have failed with 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should handle network error', () => {
    service.getUsers().subscribe({
      next: () => fail('Should have failed with network error'),
      error: (error) => {
        expect(error.error).toBe('Network error occurred');
      }
    });
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush('Network error occurred', { status: 0, statusText: 'Unknown Error' });
  });

  it('should handle empty response', () => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual([]);
      expect(users.length).toBe(0);
    });
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush([]);
  });
});
