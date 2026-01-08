import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersServices } from './UsersServices';

describe('UsersServices', () => {
  let service: UsersServices;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [UsersServices]
    });
    service = TestBed.inject(UsersServices);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users from the correct URL', () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should return an empty array when API returns empty', () => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual([]);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush([]);
  });

  it('should handle HTTP errors gracefully', () => {
    service.getUsers().subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should return users with expected structure', () => {
    const mockUsers = [
      { id: 1, name: 'Test User', username: 'testuser', email: 'test@example.com' }
    ];

    service.getUsers().subscribe(users => {
      expect(Array.isArray(users)).toBeTruthy();
      if (Array.isArray(users) && users.length > 0) {
        expect(users[0].name).toBe('Test User');
        expect(users[0].email).toBe('test@example.com');
      }
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush(mockUsers);
  });
});
