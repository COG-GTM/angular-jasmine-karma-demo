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

  it('should fetch users from the API', () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should return an empty array when API returns empty', () => {
    const mockUsers: any[] = [];

    service.getUsers().subscribe((users: any) => {
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(0);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should handle multiple users correctly', () => {
    const mockUsers = [
      { id: 1, name: 'User 1', email: 'user1@example.com' },
      { id: 2, name: 'User 2', email: 'user2@example.com' },
      { id: 3, name: 'User 3', email: 'user3@example.com' }
    ];

    service.getUsers().subscribe((users: any) => {
      expect(users.length).toBe(3);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush(mockUsers);
  });
});
